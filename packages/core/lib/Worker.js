/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const path = require('path');
const { EventEmitter } = require('events');
const async = require('neo-async');
const fs = require('graceful-fs');
const writeFileAtomic = require('write-file-atomic');
const { DEFAULT_EXTENSIONS } = require('@babel/core');

const getParser = require('jscodeshift/src/getParser');
const jscodeshift = require('jscodeshift/src/core');

let presetEnv;
try {
  presetEnv = require('@babel/preset-env');
} catch (_) {}

let emitter;
let finish;
let notify;
let transform;
let parserFromTransform;

if (module.parent) {
  emitter = new EventEmitter();
  // @ts-expect-error
  emitter.send = data => run(data);
  finish = () => emitter.emit('disconnect');
  notify = data => emitter.emit('message', data);

  module.exports = args => {
    setup(args[0], args[1]);
    return emitter;
  };
} else {
  finish = () => setImmediate(() => process.disconnect());
  notify = data => process.send(data);
  process.on('message', data => run(data));
  setup(process.argv[2], process.argv[3]);
}

function prepareJscodeshift(options) {
  const parser =
    parserFromTransform || getParser(options.parser, options.parserConfig);
  return jscodeshift.withParser(parser);
}

function retrieveTransformId(str) {
  return (str.match(/[^@]*(?:[@](?!.*[@]))(.*)$/) || [, ''])[1];
}
function retrievePresetId(str) {
  return (str.match(/[^#]*(?:[#](?!.*[#]))(.*)$/) || [, ''])[1];
}

function retrievePath(str) {
  return str.replace(/[@#][^@#]*$/, '');
}

function setup(entryPath, babel) {
  if (babel === 'babel') {
    const presets = [];
    if (presetEnv) {
      presets.push([presetEnv.default, { targets: { node: true } }]);
    }

    presets.push(
      /\.tsx?$/.test(entryPath)
        ? require('@babel/preset-typescript').default
        : require('@babel/preset-flow').default,
    );

    require('@babel/register')({
      configFile: false,
      babelrc: false,
      presets,
      plugins: [
        require('@babel/plugin-proposal-class-properties').default,
        require('@babel/plugin-proposal-nullish-coalescing-operator').default,
        require('@babel/plugin-proposal-optional-chaining').default,
        require('@babel/plugin-transform-modules-commonjs').default,
      ],
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      // By default, babel register only compiles things inside the current working directory.
      // https://github.com/babel/babel/blob/2a4f16236656178e84b05b8915aab9261c55782c/packages/babel-register/src/node.js#L140-L157
      ignore: [
        // Ignore parser related files
        /@babel\/parser/,
        /\/flow-parser\//,
        /\/recast\//,
        /\/ast-types\//,
      ],
    });
  }

  const transformId = retrieveTransformId(entryPath);
  const presetId = retrievePresetId(entryPath);

  let transformPkg;
  let transformModule;

  if (transformId) {
    transformPkg = require(retrievePath(entryPath));
    transformModule = transformPkg.transforms[transformId];
  }

  if (presetId) {
    transformPkg = require(retrievePath(entryPath));
    transformModule = transformPkg.presets[presetId];
  }

  if (!transformId && !presetId) {
    transformModule = require(path.resolve(entryPath));
  }

  transform =
    typeof transformModule.default === 'function'
      ? transformModule.default
      : transformModule;

  if (transformModule.parser) {
    parserFromTransform =
      typeof transformModule.parser === 'string'
        ? getParser(transformModule.parser)
        : transformModule.parser;
  }
}

function updateStatus(status, file, msg) {
  msg = msg ? file + ' ' + msg : file;
  notify({ action: 'status', status, msg });
}

function stats(name, quantity) {
  quantity = typeof quantity !== 'number' ? 1 : quantity;
  notify({ action: 'update', name: name, quantity: quantity });
}

function trimStackTrace(trace) {
  if (!trace) {
    return '';
  }
  // Remove this file from the stack trace of an error thrown in the transformer
  const result = [];
  trace.split('\n').every(line => {
    if (line.indexOf(__filename) === -1) {
      result.push(line);
      return true;
    }
  });
  return result.join('\n');
}

function run(data) {
  const files = data.files;
  const options = data.options || {};

  if (!files.length) {
    finish();
    return;
  }
  async.each(
    files,
    function (file, callback) {
      fs.readFile(file, async function (err, source) {
        if (err) {
          updateStatus('error', file, 'File error: ' + err);
          callback();
          return;
        }
        source = source.toString();

        try {
          const jscodeshift = prepareJscodeshift(options);
          const out = await transform(
            {
              path: file,
              source: source,
            },
            {
              j: jscodeshift,
              jscodeshift: jscodeshift,
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              stats: options.dry ? stats : () => {},
              report: msg => notify({ action: 'report', file, msg }),
            },
            options,
          );
          if (!out || out === source) {
            updateStatus(out ? 'nochange' : 'skip', file);
            callback();
            return;
          }
          if (options.print) {
            console.log(out); // eslint-disable-line no-console
          }
          if (!options.dry) {
            writeFileAtomic(file, out, err => {
              if (err) {
                updateStatus('error', file, 'File writer error: ' + err);
              } else {
                updateStatus('ok', file);
              }
              callback();
            });
          } else {
            updateStatus('ok', file);
            callback();
          }
        } catch (err) {
          updateStatus(
            'error',
            file,
            'Transformation error (' +
              err.message.replace(/\n/g, ' ') +
              ')\n' +
              trimStackTrace(err.stack),
          );
          callback();
        }
      });
    },
    function (err) {
      if (err) {
        updateStatus('error', '', 'This should never be shown!');
      }
      notify({ action: 'free' });
    },
  );
}
