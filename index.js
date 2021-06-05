const ConfigReader = require('./configReader');
const Graph = require('./graph');

const configReader = new ConfigReader('**/*.spec.js');
const configs = configReader.readAllFiles();

const myGraph = new Graph(configs);

module.exports = {
  getFullOrder() {
    const fullOrder = myGraph.getTopologicalSort();
    const fullOrderFileNames = configReader.resolveIds(fullOrder);

    return fullOrderFileNames;
  }
};
