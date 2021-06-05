const ConfigReader = require('./configReader');
const Graph = require('./graph');

const configReader = new ConfigReader('**/*.spec.js');

const configs = configReader.readAllFiles();
const myGraph = new Graph(configs);

myGraph.drawSVG().then(() => {
  console.log('Script done.');
});
