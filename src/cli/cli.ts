#!/usr/bin/env node

import { cwd } from 'process';

import yargs from 'yargs';

import { 
  draw,
  generateConfig,
  ids,
  order,
  run
} from './cliInternal';

yargs
  .scriptName("cypress-runner")
  .usage('$0 <cmd> [args]')
  .command('ids [cwdPath]', 'get all ids which was parsed', (yargs) => {
    yargs.positional('cwdPath', {
      type: 'string',
      default: cwd(),
      describe: 'absolute path where script should find ids'
    });
  }, ids)
  .command('generate-config [cwdPath] [newConfig] [config]', 'generate config file', (yargs) => {
    yargs.positional('cwdPath', {
      type: 'string',
      default: cwd(),
      describe: 'absolute path where script should find ids'
    });
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
  }, generateConfig)
  .command('order [cwdPath]', 'get order resulting from graph', (yargs) => {
    yargs.positional('cwdPath', {
      type: 'string',
      default: cwd(),
      describe: 'absolute path where script should find ids'
    });
  }, order)
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
  }, draw)
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
  }, run)
  .help()
  .argv;
