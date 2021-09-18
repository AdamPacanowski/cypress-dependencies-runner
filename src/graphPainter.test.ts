import { expect } from '@jest/globals';
import { mocked } from 'ts-jest/utils';

import { renderGraphFromSource } from 'graphviz-cli'; 
jest.mock('graphviz-cli');
const renderGraphFromSourceMock = mocked(renderGraphFromSource);

import Graph from './graph';
import GraphPainter from './graphPainter';

import { configs, results, graphDescription } from './jestFixtures/graph/basicGraphExampleData';

describe('graphPainter', () => {
  it('tests drawing svg (basic data)', (done) => {
    const myGraph = new Graph(configs);
    renderGraphFromSourceMock.mockReturnValueOnce(Promise.resolve('<svg></svg>'));

    myGraph.setResults(results);

    const graphPainter = new GraphPainter(myGraph);

    graphPainter.drawSVG().then(() => {
      const currentGraphDescription = JSON.stringify(renderGraphFromSourceMock.mock.calls[0][0]);

      // todo fix
      // expect(graphDescription).toEqual(currentGraphDescription);

      done();
    });
  });
});
