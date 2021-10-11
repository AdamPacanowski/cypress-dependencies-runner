#!/usr/bin/env node

import { cwd } from 'process';
import yargs from 'yargs';
import indexFunctions from './index';

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
  .command('draw', 'draw (empty) diagram', (yargs) => {
    yargs.positional('cwdPath', {
      type: 'string',
      default: cwd(),
      describe: 'absolute path where script should find ids'
    });
    yargs.positional('outputFullPath', {
      type: 'string',
      default: 'output.svg',
      describe: 'full path to place (including filename) where you can save image'
    })
  }, function (argv: {
    cwdPath: string,
    outputFullPath: string
  }) {
    console.log(`cwdPath: ${ argv.cwdPath }`);
    console.log(`outputFullPath: ${ argv.outputFullPath }`);

    indexFunctions.drawEmpty(argv.cwdPath);
  })
  .help()
  .argv;
