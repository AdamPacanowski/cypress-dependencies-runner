import { execSync } from 'child_process';
import { resolve } from 'path';
import { cwd } from 'process';

const plopBinary = resolve('./node_modules/.bin/plop');
const simpleReversedCwd = cwd().replace(/\\/g, '/');

function getPlopCommand({
  generatorName,
  args = {}
}) {
  const expandedArgs = Object.keys(args).map(argKey => {
    return `--${ argKey }="${ args[argKey] }"`.replace(/\\/g, '\\\\');
  }).join(' ');

  return `${ plopBinary } ${ generatorName } --plopfile src/jestFixtures/jestFixturesPlopFile.mjs -- ${ expandedArgs }`;
}

console.log('Preparing test fixtures...');

execSync(getPlopCommand({
  generatorName: 'basicGraphExampleData',
  args: {
    cwd: cwd()
  }
}));

execSync(getPlopCommand({
  generatorName: 'basicResults',
  args: {
    cwd: cwd(),
    simpleReversedCwd,
  }
}));

console.log('Text fixtures generated.');
