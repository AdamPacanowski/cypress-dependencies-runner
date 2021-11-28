#!/usr/bin/env node

import { cwd } from 'process';
import { readFileSync, existsSync, writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import yargs from 'yargs';
import indexFunctions from './index';
import { getDescription, getValue } from './parameters';
import { execFile, spawn } from 'child_process';

const generateConfig = (argv: {
  cwdPath: string,
  newConfig: string,
  config?: string,
  type?: string,
  node?: string
}) => {
  const myGraph = indexFunctions.getGraph(argv.cwdPath);
  console.log(myGraph.graph.serialize());
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
  console.log(`Saved to ${ argv.newConfig }`);
}

yargs
  .scriptName("cypress-runner")
  .usage('$0 <cmd> [args]')
  .command('ids [cwdPath]', 'get all ids which was parsed', (yargs) => {
    yargs.positional('cwdPath', {
      type: 'string',
      default: cwd(),
      describe: 'absolute path where script should find ids'
    });
  }, function (argv: {
    cwdPath: string
  }) {
    console.log(`cwdPath: ${ argv.cwdPath }`);

    const results = indexFunctions.getAllIds(argv.cwdPath)
      .sort((a, b) => a.localeCompare(b));

    console.log(results);
  })
  .command('generate-config [cwdPath] [newConfig] [config]', 'generate config file', (yargs) => {
    yargs.positional('cwdPath', {
      type: 'string',
      default: cwd(),
      describe: 'absolute path where script should find ids'
    })
    yargs.positional('newConfig', {
      type: 'string',
      default: null,
      describe: 'path to new file'
    });
    yargs.positional('config', {
      type: 'string',
      default: null,
      describe: 'path to config file (if null then will be created)'
    });
  }, function(argv: {
    cwdPath: string,
    newConfig: string,
    config: string
  }) {
    generateConfig(argv);
  })
  .command('order [cwdPath]', 'get order resulting from graph', (yargs) => {
    yargs.positional('cwdPath', {
      type: 'string',
      default: cwd(),
      describe: 'absolute path where script should find ids'
    });
  }, function(argv: {
    cwdPath: string
  }) {
    const myGraph = indexFunctions.getGraph(argv.cwdPath);
    const order = indexFunctions.getFullOrder(myGraph);

    console.log(JSON.stringify(order));
  })
  .command('draw [cwdPath] [resultsJson]', 'draw (empty) diagram', (yargs) => {
    yargs.option('outputSvgFileName', {
      alias: ['filename'],
      type: 'string'
    });
    yargs.positional('cwdPath', {
      type: 'string',
      describe: 'absolute path where script should find ids'
    });
    yargs.positional('resultsJson', {
      type: 'string',
      describe: 'resultsJson file; if skipped, there will be generated empty diagram'
    });
  }, function (argv: {
    cwdPath: string,
    resultsJson: string
    outputSvgFileName: string
  }) {
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
  })
  .command('run [type] [cwdPath] [node]', 'run tests by runner', (yargs) => {
    yargs.positional('type', {
      type: 'string'
    });
    yargs.positional('cwdPath', {
      type: 'string'
    });
    yargs.positional('node', {
      type: 'string'
    });
  }, function(argv: {
    type: string,
    cwdPath: string,
    node: string
  }) {
    const tempConfigName = '_tempConfig.json';
    const tempConfigExists = existsSync(tempConfigName);

    if (tempConfigExists) {
      unlinkSync(tempConfigName);
    }    

    generateConfig({
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
      console.log(chunk.toString());
    });
  
    proc.stderr.on('data', (chunk) => {
      console.log(chunk.toString());
    });
  })
  .help()
  .argv;
