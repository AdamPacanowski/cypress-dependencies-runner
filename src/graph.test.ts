import { expect } from '@jest/globals';

import Graph from './graph';
import { configs, results } from './jestFixtures/graph/basicGraphExampleData.ploped';

describe('graph', () => {
  it('tests object creation (basic data)', () => {
    const myGraph = new Graph(configs);

    const simpleGraphDefinition = {
      '1.1': ['1.2', '2.1'],
      '1.2': [],
      '2.1': [],
      '2.2': ['2.1', '3.3'],
      '2.3': ['2.1'],
      '2.4': ['1.2', '2.2', '3.1'],
      '3.1': ['3.2'],
      '3.2': ['3.3'],
      '3.3': []
    };
    const nodes = myGraph.graph.nodes();
    const expectedNodes = Object.keys(simpleGraphDefinition);

    expectedNodes.forEach(node => {
      expect(nodes).toContainEqual(node);
    });
    expect(nodes.length).toEqual(expectedNodes.length);

    expectedNodes.forEach(node => {
      const adjacentNodes= myGraph.graph.adjacent(node);

      adjacentNodes.forEach(adjacentNode => {
        expect(simpleGraphDefinition[node]).toContainEqual(adjacentNode);
      });
      expect(simpleGraphDefinition[node].length).toEqual(adjacentNodes.length);
    });
  });

  it('tests topological sort (basic data)', () => {
    const myGraph = new Graph(configs);

    expect(myGraph.getTopologicalSort())
      .toEqual(['2.4', '3.1', '3.2', '2.3', '2.2', '3.3', '1.1', '2.1', '1.2']);
  });

  it('tests hasCycle method (basic data)', () => {
    const myGraph = new Graph(configs);

    expect(myGraph.hasCycle()).toBeFalsy();
  });
  
  it('tests getColors method (basic data)', () => {
    const myGraph = new Graph(configs);

    expect(myGraph.colors).toEqual(null);

    myGraph.setResults(results);

    expect(myGraph.colors['1.2']).toEqual({
      color: 'red',
      text: '1/2'
    });
    for (const nodeId in myGraph.colors) {
      if (nodeId === '1.2') {
        continue;
      }

      const value = myGraph.colors[nodeId];

      expect(value.color).toEqual('green');
      expect(value.text).toBeTruthy();
    }
  });
});
