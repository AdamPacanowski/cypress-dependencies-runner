require('dotenv').config();
const ConfigReader = require('./configReader');
const Graph = require('./graph');

const globPattern = process.env.CDR_GLOB_PATTERN || '**/*.spec.js';

const configReader = new ConfigReader(globPattern);

const configs = configReader.readAllFiles();
const myGraph = new Graph(configs);

myGraph.drawSVG().then(() => {
  console.log('Script done.');
});
