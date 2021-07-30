const _ = require('lodash');
const GraphDS = require('graph-data-structure');
// https://www.npmjs.com/package/graph-data-structure#querying-the-graph

class Graph {
  constructor(configs) {
    this.configs = configs;
    this.graph = this.createGraphObj();
    this.results = null;
    this.colors = null;
  }

  setResults(results) {
    this.results = results;
    this.colors = this.getColors();
  }

  createGraphObj() {
    const obj = GraphDS();

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

  getColors() {
    return this.configs.reduce((obj, config) => {
      const adequateResult = _.find(this.results, {
        specAbsolutePath: config.specAbsolutePath
      });
      console.log('-->', this.results, config);
      if (adequateResult.failures) {
        obj[config.id] = 'red';
      } else {
        obj[config.id] = 'green';
      }

      return obj;
    }, {});
  }

  hasCycle() {
    return this.graph.hasCycle();
  }

  getAllRouteBetweenTwoPaths(sourceNode, destinationNode) {
    const tempGraph = this.createGraphObj();
    const results = [];

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

  getTopologicalSort() {
    return this.graph.topologicalSort();
  }
}

module.exports = Graph;