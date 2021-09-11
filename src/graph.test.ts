import { expect } from '@jest/globals';

import Graph from './graph'
import { IDescribeConfigWithMetaData } from './configReader';

import { configs } from './jestFixtures/graph/basicGraphExampleData';

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
    }
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
    })
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
  
});
