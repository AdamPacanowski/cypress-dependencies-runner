require('dotenv').config();
import consoleUtils from './consoleUtils';
import ConfigReader from "./configReader";
import Graph from './graph';
import GraphPainter from './graphPainter';
import ResultsParser from "./resultsParser";

const globPattern = process.env.CDR_GLOB_PATTERN || '**/*.spec.js';

const configReader = new ConfigReader(globPattern);

export default {
  getGraph(cwdPath?: string): Graph { // TODO change to class and move it to constructor
    const configs = configReader.readAllFilesWithMetadata(cwdPath);

    const myGraph = new Graph(configs);

    return myGraph;
  },
  getAllIds(cwdPath: string) {
    const globPattern = process.env.CDR_GLOB_PATTERN || '**/*.spec.js';

    const configReader = new ConfigReader(globPattern);
    
    const results = configReader.getAllIds(cwdPath);

    return results;
  },
  getFullOrder(myGraph: Graph, destinationNode?: string, special?: string): string[] {
    if (special === 'roadto' || special === 'only') {
      const fullOrder = myGraph.getAllAncestors(destinationNode, special === 'only');
      const fullOrderFileNames = configReader.resolveIds(fullOrder);

      return fullOrderFileNames;
    } 
    
    const fullOrder = myGraph.getTopologicalSort();
    const fullOrderFileNames = configReader.resolveIds(fullOrder);

    return fullOrderFileNames;  
  },
  drawEmpty(cwdPath: string, fileName?: string): void {
    const configs = configReader.readAllFilesWithMetadata(cwdPath);
    const myGraph = new Graph(configs);

    consoleUtils.log('Drawing empty...');

    const graphPainter = new GraphPainter(myGraph);

    graphPainter.drawSVG(fileName).then(() => {
      consoleUtils.info('SVG file created!');
    });
  },
  draw(
    runsResultsRaw: CypressCommandLine.RunResult[],
    myGraph: Graph, 
    fileName?: string
  ): void {
    consoleUtils.logEnabled = true;
    consoleUtils.info('Drawing...');

    const resultsParser = new ResultsParser();
    consoleUtils.info('#2');
    const runsResults = resultsParser.parse(runsResultsRaw);
    consoleUtils.info('#3');

    myGraph.setResults(runsResults);
    consoleUtils.info('#4');

    const graphPainter = new GraphPainter(myGraph);
    consoleUtils.info('#5', fileName);

    graphPainter.drawSVG(fileName).then(() => {
      consoleUtils.info('SVG file created!');
    });
  },
  get(
    type: string, // TBD change to enum
    cwdPath: string
  ): void {

  }
};
