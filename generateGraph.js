require('dotenv').config();
const ConfigReader = require('./configReader');
const Graph = require('./graph');

const globPattern = process.env.CDR_GLOB_PATTERN || '**/*.spec.js';

const configReader = new ConfigReader(globPattern);

module.exports = (results) => {
  const configs = configReader.readAllFilesWithMetadata();
  const myGraph = new Graph(configs, results);

  console.log(myGraph.getColors());

  // myGraph.drawSVG().then(() => {
  //   console.log('Script done.');
  // });
}
