require('dotenv').config();
const ConfigReader = require('./configReader');
const Graph = require('./graph');

const globPattern = process.env.CDR_GLOB_PATTERN || '**/*.spec.js';

const configReader = new ConfigReader(globPattern);
const configs = configReader.readAllFiles();

const myGraph = new Graph(configs);

module.exports = {
  getFullOrder() {
    const fullOrder = myGraph.getTopologicalSort();
    const fullOrderFileNames = configReader.resolveIds(fullOrder);

    return fullOrderFileNames;
  }
};
