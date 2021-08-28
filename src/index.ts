require('dotenv').config();
import consoleUtils from './consoleUtils';
import ConfigReader from "./configReader";
import Graph from './graph';
import GraphPainter from './graphPainter';
import ResultsParser from "./resultsParser";

const globPattern = process.env.CDR_GLOB_PATTERN || '**/*.spec.js';

let configReader = new ConfigReader(globPattern);

export default {
  run(cwdPath?: string): Graph { // TODO change to class and move it to constructor
    const configs = configReader.readAllFilesWithMetadata(cwdPath);

    const myGraph = new Graph(configs);

    return myGraph;
  },
  getFullOrder(myGraph: Graph): string[] {
    const fullOrder = myGraph.getTopologicalSort();
    const fullOrderFileNames = configReader.resolveIds(fullOrder);
  
    return fullOrderFileNames;
  },
  draw(runsResultsRaw: CypressCommandLine.RunResult[], myGraph: Graph): void {
    consoleUtils.log('Drawing...');

    const resultsParser = new ResultsParser();
    const runsResults = resultsParser.parse(runsResultsRaw);

    myGraph.setResults(runsResults);

    const graphPainter = new GraphPainter(myGraph);

    graphPainter.drawSVG().then(() => {
      consoleUtils.log('SVG file created!');
    })
  }
};
