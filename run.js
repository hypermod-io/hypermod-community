#!/usr/bin/env node

/**
 * a temporary utility to run local codemods quickly
 * before we improve stuff upstream.
 */

const helpMsg = `
run.js parser=flow codemodsToRun fileOrDirectoryToModify extensions="js,jsx,ts,tsx"

codemodsToRun - paths to codemods which have a codeshift.config.js file.
                separated by spaces.
                can also just provide keys from the "shorthands.json" file

examples:

./run.js flow ./community/@pipedrive__convention-ui-react/src/5.0.0/transform.ts ~/projects/some-project-which-uses-cui4/src/
./run.js flow cui5                                                               ~/projects/some-project-which-uses-cui4/src/ # cui5 is from shorthands.json

`;

const path = require('path');
const cp = require('child_process');

const peekNextArg = () => process.argv[0];
const eatNextArg = () => process.argv.shift();

const shouldPrintHelp = () => (
  (should =
    !process.argv.length ||
    ['-h', '--help', '-help', 'help'].includes(peekNextArg())),
  should && console.log(helpMsg),
  should
);

const parseArgv = () => (
  process.argv.splice(0, 2),
  shouldPrintHelp() && process.exit(1),
  {
    parser: eatNextArg() || 'flow',
    transformsToRun: parseArrayFromCsv(eatNextArg() || ''),
    fileOrDirectoryToModify: eatNextArg() || '',
    extensions: eatNextArg() || 'js,jsx,ts,tsx',
  }
);

run();

function run() {
  let {
    parser, //
    transformsToRun,
    fileOrDirectoryToModify,
    extensions,
  } = parseArgv();

  const shorthands = require(path.join(__dirname, './shorthands.json'));
  console.log({ shorthands });

  transformsToRun = transformsToRun
    .map(t => {
      if (t in shorthands) {
        return resolveTransformsFromShorthand(shorthands[t]);
      } else {
        const dir = path.dirname(t);
        const cmd = `yarn --cwd ${dir} build`;
        console.log('transform to run, build cmd', { cmd });
        cp.execSync(cmd);
        return t;
      }
    })
    .flat()
    .join(',');

  const cliPath = path.join(__dirname, './packages/cli/bin/codeshift-cli.js');

  const cmdToExec = `${cliPath} --parser ${parser} -e ${extensions} -t ${transformsToRun} ${fileOrDirectoryToModify}`;
  console.log({ cmdToExec });

  cp.exec(cmdToExec, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return process.exit(1);
    }

    console.log(stdout);

    console.log('succ');
    process.exit(0);
  });
}

function parseArrayFromCsv(csv = '') {
  return csv
    .split(',')
    .filter(c => !!c)
    .map(c => c.trim())
    .filter(c => !!c);
}

function resolveTransformsFromShorthand([pathToCodemodPkg, transformVersion]) {
  cp.execSync(`yarn --cwd ${pathToCodemodPkg} build`);
  console.log('built');

  const pathToCodemodConfig = path.join(
    pathToCodemodPkg,
    'dist',
    'codeshift.config.js',
  );
  console.log({ pathToCodemodConfig });

  const codemodCfg = require(path.join(__dirname, pathToCodemodConfig));

  const { transforms } = codemodCfg;

  const transformsApplicable = Object.entries(transforms)
    .map(([version, relPathToTransform]) => {
      if (version === transformVersion) {
        return relPathToTransform;
        // return path.join(pathToCodemodPkg, 'dist', relPathToTransform); // TODO must ensure it's compiled / run with ts-node / require from 'dist'
      }
    })
    .filter(x => !!x);

  return transformsApplicable;
}
