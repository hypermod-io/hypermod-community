const path = require('path');
const { writeFileSync, readFileSync } = require('fs');
const { execSync } = require('child_process');

function main() {
  {
    const targetFilePath = path.join(__dirname, 'remove-debugger-test1.ts');
    writeFileSync(targetFilePath, `function hello() { debugger; }`);

    execSync(
      `npx --yes @hypermod/cli@latest --packages javascript#remove-debugger --verbose="0" ${targetFilePath}`,
      { stdio: 'inherit' },
    );

    const targetFileOutput = readFileSync(targetFilePath, 'utf-8');
    const expectedFileOutput = `function hello() {}`;

    if (targetFileOutput !== expectedFileOutput) {
      throw new Error(
        `Expected ${targetFileOutput} to equal ${expectedFileOutput}`,
      );
    }

    console.log('RESULT -------------');
    console.log('Correctly removed debugger statement');
  }

  {
    const targetFilePath = path.join(__dirname, 'remove-unused-vars-test2.ts');
    writeFileSync(
      targetFilePath,
      `export function hello() { var a = 1; debugger; }`,
    );

    execSync(
      `npx --yes @hypermod/cli@latest --packages javascript#remove-unused-vars --experimental-loader --verbose="0" ${targetFilePath}`,
      { stdio: 'inherit' },
    );

    const targetFileOutput = readFileSync(targetFilePath, 'utf-8');
    const expectedFileOutput = `export function hello() {
  debugger;
}`;

    if (targetFileOutput !== expectedFileOutput) {
      throw new Error(
        `Expected ${targetFileOutput} to equal ${expectedFileOutput}`,
      );
    }

    console.log('RESULT -------------');
    console.log('Correctly removed unused var statement');
  }
}

main();
