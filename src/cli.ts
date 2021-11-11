#!/usr/bin/env node

import { cwd } from 'process';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import yargs from 'yargs';
import indexFunctions from './index';
import { getDescription, getValue } from './parameters';

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
  .command('generate-config [cwdPath] [newConfig] [config]', 'generate config', (yargs) => {
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
    const myGraph = indexFunctions.run(argv.cwdPath);
    const order = indexFunctions.getFullOrder(myGraph);

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

    writeFileSync(argv.newConfig, JSON.stringify(configJson));
    console.log(`Saved to ${ argv.newConfig }`);
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
    const myGraph = indexFunctions.run(argv.cwdPath);
    const order = indexFunctions.getFullOrder(myGraph);

    console.log(JSON.stringify(order));
  })
  .command('draw [cwdPath] [TEMP_DIRPATH] [resultsJson]', 'draw (empty) diagram', (yargs) => {
    yargs.positional('cwdPath', {
      type: 'string',
      default: cwd(),
      describe: 'absolute path where script should find ids'
    });
    yargs.positional('TEMP_DIRPATH', {
      type: 'string',
      describe: 'TEMP_DIRPATH'
    })
    yargs.positional('resultsJson', {
      type: 'string',
      describe: 'resultsJson'
    })
  }, function (argv: {
    cwdPath: string,
    TEMP_DIRPATH: string,
    resultsJson: string
    // outputSvgFileName: string
  }) {
    console.log('resultsJson', argv.resultsJson);
    console.log('TEMP_DIRPATH', argv.TEMP_DIRPATH);
    console.log(`cwdPath: ${ argv.cwdPath }`);
    console.log('')
    // console.log(`outputSvgFileName: ${ argv.outputSvgFileName }`);

    // indexFunctions.drawEmpty(argv.cwdPath, argv.outputSvgFileName);
    const newResults = [];
    const results = JSON.parse(readFileSync(argv.resultsJson).toString());

    // TODO typings
    results.results.forEach(result => {
      const obj = {
        spec: {
          absolute: join(argv.TEMP_DIRPATH, result.fullFile)
        },
        stats: {
          tests: result.suites[0].tests.length || 0,
          passes: result.suites[0].passes.length || 0,
          pending: result.suites[0].pending.length || 0,
          skipped: result.suites[0].skipped.length || 0,
          failures: result.suites[0].failures.length || 0
        }
      };

      newResults.push(obj);
    });

    const myGraph = indexFunctions.run(argv.cwdPath);

    indexFunctions.draw(newResults, myGraph);
  })
  .help()
  .argv;
