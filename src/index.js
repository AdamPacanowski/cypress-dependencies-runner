require('dotenv').config();
const ConfigReader = require('./configReader');
const Graph = require('./graph');

const globPattern = process.env.CDR_GLOB_PATTERN || '**/*.spec.js';

let configReader = new ConfigReader(globPattern);

module.exports = {
  run() {
    const configs = configReader.readAllFiles();

    const myGraph = new Graph(configs);

    return myGraph;
  },
  getFullOrder(myGraph) {
    const fullOrder = myGraph.getTopologicalSort();
    const fullOrderFileNames = configReader.resolveIds(fullOrder);
  
    return fullOrderFileNames;
  }
};
