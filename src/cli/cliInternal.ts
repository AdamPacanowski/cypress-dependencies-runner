import { readFileSync, existsSync, writeFileSync, unlinkSync } from 'fs';
import { spawn } from 'child_process';

import indexFunctions from '../index';
import consoleUtils from '../consoleUtils';

const _generateConfig = (argv: {
  cwdPath: string,
  newConfig: string,
  config?: string,
  type?: string,
  node?: string
}) => {
  const myGraph = indexFunctions.getGraph(argv.cwdPath);
  const order = indexFunctions.getFullOrder(myGraph, argv.node, argv.type);

  let configJson: object;

  if (argv.config) {
    if (existsSync(argv.config)) {
      configJson = JSON.parse(readFileSync(argv.config).toString());
    } else {
      throw new Error('MISSING DEFINED FILE');
    }
  } else {
    configJson = {};
  }

  configJson['testFiles'] = order;
  configJson['integrationFolder'] = '.';

  writeFileSync(argv.newConfig, JSON.stringify(configJson));

  consoleUtils.info('Saved to', argv.newConfig);
};

export const draw = (argv: {
  cwdPath: string,
  resultsJson: string
  outputSvgFileName: string
}) => {
  if (!argv.resultsJson) {
    indexFunctions.drawEmpty(argv.cwdPath, argv.outputSvgFileName);
    return;
  }

  const parsedResults = JSON.parse(readFileSync(argv.resultsJson).toString());

  if (!parsedResults.runs) {
    throw new Error('Something wrong with results!');
  }

  // TODO Checking structure !!!
  const myGraph = indexFunctions.getGraph(argv.cwdPath);
  const runsResultsRaw = parsedResults.runs as CypressCommandLine.RunResult[];

  indexFunctions.draw(runsResultsRaw, myGraph, argv.outputSvgFileName);
};

export const generateConfig = (argv: {
  cwdPath: string,
  newConfig: string,
  config: string
}) => {
  _generateConfig(argv);
};

export const ids = (argv: {
  cwdPath: string
}) => {
  consoleUtils.log('cwdPath:', argv.cwdPath);

  const results = indexFunctions.getAllIds(argv.cwdPath)
    .sort((a, b) => a.localeCompare(b));

  consoleUtils.info(JSON.stringify(results));

  return results;
};

export const order = (argv: {
  cwdPath: string
}) => {
  const myGraph = indexFunctions.getGraph(argv.cwdPath);
  const fullOrder = indexFunctions.getFullOrder(myGraph);

  console.info(JSON.stringify(fullOrder));

  return fullOrder;
};

export const run = (argv: {
  type: string,
  cwdPath: string,
  node: string
}) => {
  const tempConfigName = '_tempConfig.json';
  const tempConfigExists = existsSync(tempConfigName);

  if (tempConfigExists) {
    unlinkSync(tempConfigName);
  }    

  _generateConfig({
    cwdPath: argv.cwdPath,
    newConfig: tempConfigName,
    type: argv.type,
    node: argv.node
  });

  const proc = spawn(/^win/.test(process.platform) ? 'npx.cmd' : 'npx', [
    'cypress',
    'run',
    `--config-file=${ tempConfigName }`
  ]);

  proc.stdout.on('data', (chunk) => {
    console.info('CypressRunner run', chunk.toString());
  });

  proc.stderr.on('data', (chunk) => {
    console.info('CypressRunner run error', chunk.toString());
  });
};

