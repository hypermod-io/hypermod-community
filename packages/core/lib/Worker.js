import path from 'path';
import async from 'neo-async';
import fs from 'graceful-fs';
import writeFileAtomic from 'write-file-atomic';
import { fileURLToPath } from 'url';
import { register } from 'tsx/esm/api';

import getParser from 'jscodeshift/src/getParser.js';
import jscodeshift from 'jscodeshift/src/core.js';
import { workerData, isMainThread, parentPort } from 'worker_threads';

/**
 * Register the TSX plugin to allow import TS(X) files.
 */
register();

let transform;
let parserFromTransform;

// Get the __filename and __dirname equivalents for ESM
const __filename = fileURLToPath(import.meta.url);

if (!isMainThread) {
  await setup(workerData.entrypointPath);
  parentPort.on('message', data => run(data));
}

function prepareJscodeshift(options) {
  return jscodeshift.withParser(
    parserFromTransform || getParser(options.parser, options.parserConfig),
  );
}

function retrieveTransformId(str) {
  if (str.includes('#')) return false;
  return (str.match(/[^@]*(?:[@](?!.*[@]))(.*)$/) || [, ''])[1];
}

function retrievePresetId(str) {
  return (str.match(/[^#]*(?:[#](?!.*[#]))(.*)$/) || [, ''])[1];
}

function retrievePath(str) {
  return str.replace(/[@#][^@#]*$/, '');
}

function getModule(mod) {
  return Boolean(mod.default) ? mod.default : mod;
}

async function getModuleName(path) {
  const moduleName = retrievePath(path).split('node_modules/')[1];
  const pkg = await import(moduleName);
  return getModule(pkg);
}

async function setup(entryPath) {
  const transformId = retrieveTransformId(entryPath);
  const presetId = retrievePresetId(entryPath);

  let transformPkg;
  let transformModule;

  if (transformId) {
    transformPkg = await getModuleName(entryPath);
    transformModule = transformPkg.transforms[transformId];
  }

  if (presetId) {
    transformPkg = await getModuleName(entryPath);
    transformModule = transformPkg.presets[presetId];
  }

  if (!transformId && !presetId) {
    transformModule = await import(path.resolve(entryPath));
  }

  transform = getModule(transformModule);

  if (transformModule.parser) {
    parserFromTransform =
      typeof transformModule.parser === 'string'
        ? getParser(transformModule.parser)
        : transformModule.parser;
  }
}

function updateStatus(status, file, msg) {
  msg = msg ? file + ' ' + msg : file;
  parentPort.postMessage({ action: 'status', status, msg });
}

function stats(name, quantity) {
  quantity = typeof quantity !== 'number' ? 1 : quantity;
  parentPort.postMessage({ action: 'update', name: name, quantity: quantity });
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
    parentPort.close();
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
            { path: file, source: source },
            {
              j: jscodeshift,
              jscodeshift: jscodeshift,
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              stats: options.dry ? stats : () => {},
              report: msg =>
                parentPort.postMessage({ action: 'report', file, msg }),
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
      parentPort.postMessage({ action: 'free' });
    },
  );
}
