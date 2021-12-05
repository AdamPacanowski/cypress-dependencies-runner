import _ from 'lodash';
import GraphDS from 'graph-data-structure';
// https://www.npmjs.com/package/graph-data-structure#querying-the-graph
import { IDescribeConfigWithMetaData } from './configReader';
import { IResult } from './resultsParser';

interface IGraphDSSerialized {
  nodes: {
    id: string;
  }[];
  links: {
    source: string;
    target: string;
    weight: string;
  }[];
};

export interface IGraphDS {
  addEdge: (u: string, v: string) => void;
  addNode: (node: string) => void;
  adjacent: (node: string) => string[];
  hasCycle: () => boolean;
  nodes: () => string[];
  removeNode: (node: string) => void;
  serialize: () => IGraphDSSerialized;
  shortestPath: (source: string, destination: string) => string[];
  topologicalSort: () => string[];
};

function isIGraphDS(obj: any): obj is IGraphDS {
  const interfaceProps = ['addEdge', 'addNode', 'hasCycle', 'removeNode', 'serialize', 'shortestPath', 'topologicalSort'];

  return interfaceProps.every(interfaceProp => obj[interfaceProp]);
};

type IColorsEntryColor = 'green' | 'red';

interface IColorsEntry {
  color: IColorsEntryColor,
  text: string
}

export interface IColors {
  [index: string]: IColorsEntry
};

class Graph {
  public colors: IColors;
  public graph: IGraphDS;
  private configs: IDescribeConfigWithMetaData[];
  private results: IResult[];

  constructor(configs: IDescribeConfigWithMetaData[]) {
    this.configs = configs;
    this.graph = this.createGraphObj();
    this.results = null;
    this.colors = null;
  }

  setResults(results: IResult[]) {
    this.results = results;
    this.colors = this.getColors();
  }

  createGraphObj(): IGraphDS {
    const obj = GraphDS();

    if (!isIGraphDS(obj)) {
      throw new Error('Wrong graph type!');
    }

    // Adding nodes
    this.configs.forEach(config => {
      obj.addNode(config.id);
    });

    // Adding edges
    this.configs.forEach(config => {
      if (!config.require) {
        return;
      }

      config.require.forEach(requiredNode => {
        obj.addEdge(requiredNode, config.id);
      });
    });

    return obj;
  }

  private getColors(): IColors {
    return this.configs.reduce((obj, config) => {
      const adequateResult = _.find(this.results, {
        specAbsolutePath: config.specAbsolutePath
      });

      const text = `${ adequateResult.passes }/${ adequateResult.tests }`;
      let color: IColorsEntryColor;

      if (adequateResult.failures) {
        color = 'red';
      } else {
        color = 'green';
      }

      obj[config.id] = {
        color,
        text
      };

      return obj;
    }, {} as IColors);
  }

  hasCycle(): boolean {
    return this.graph.hasCycle();
  }

  // TODO Check typing
  getAllRouteBetweenTwoNodes(sourceNode: string, destinationNode: string): string[] {
    const tempGraph = this.createGraphObj();
    const results: string[] = [];

    try {
      while(1) {
        const result = tempGraph.shortestPath(sourceNode, destinationNode);

        results.push(JSON.parse(JSON.stringify(result)));

        result.pop();
        result.shift();

        result.forEach(resultElement => {
          tempGraph.removeNode(resultElement);
        });  
      }
    }
    catch (e) {}

    return results;
  }

  getTopologicalSort(): string[] {
    return this.graph.topologicalSort();
  }

  _getFirstNode(destinationNode: string): string {
    const topologicalSort = this.getTopologicalSort();

    const isConnected = (firstNode: string, destinationNode: string) => {
      let connected = false;

      try {
        this.graph.shortestPath(firstNode, destinationNode);
        connected = true;
      }
      catch(e) {
        connected = false;
      }

      return connected;
    };

    let firstNode;

    for(let i=0; i<topologicalSort.length; i++) {
      if (isConnected(topologicalSort[i], destinationNode)) {
        firstNode = topologicalSort[i];
        break;
      }
    }

    return firstNode;
  }

  connectionExists(sourceNode, destinationNode) {
    let ok = false;

    try {
      this.graph.shortestPath(sourceNode, destinationNode);
      ok = true;
    }
    catch (e) {
      ok = false;
    }

    return ok;
  }

  // TODO - write test with two separated graphs
  getAllAncestors(destinationNode: string, includeDestinationNode = true): string[] {
    const topologicalSort = this.getTopologicalSort();

    let fullPath = topologicalSort.reduce((arr, currentNode) => {
      if (this.connectionExists(currentNode, destinationNode)) {
        arr.push(currentNode);
      }

      return arr;
    }, []);

    if (!includeDestinationNode) {
      fullPath = fullPath.filter(node => node !== destinationNode);
    }

    return fullPath;
  }
}

export default Graph;
