require('dotenv').config();
const ConfigReader = require('./configReader');
const Graph = require('./graph');
const GraphPainter = require('./graphPainter');
const ResultsParser = require('./resultsParser');

const globPattern = process.env.CDR_GLOB_PATTERN || '**/*.spec.js';

let configReader = new ConfigReader(globPattern);

module.exports = {
  run() { // change to class and move it to constructor
    const configs = configReader.readAllFilesWithMetadata();
    console.log('configs', configs);
    const myGraph = new Graph(configs);

    return myGraph;
  },
  getFullOrder(myGraph) {
    const fullOrder = myGraph.getTopologicalSort();
    const fullOrderFileNames = configReader.resolveIds(fullOrder);
  
    return fullOrderFileNames;
  },
  draw(runsResultsRaw, myGraph) {
    console.log('Drawing...');

    const resultsParser = new ResultsParser();
    const runsResults = resultsParser.parse(runsResultsRaw);

    myGraph.setResults(runsResults);

    const graphPainter = new GraphPainter(myGraph);

    graphPainter.drawSVG().then(() => {
      console.log('SVG file created!');
    })
  }
};
