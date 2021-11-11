import { expect } from '@jest/globals';
import { mocked } from 'ts-jest/utils';

// import { renderGraphFromSource } from 'graphviz-cli'; 
// jest.mock('graphviz-cli');
// const renderGraphFromSourceMock = mocked(renderGraphFromSource);

import drawSvg from './drawSvg';
jest.mock('./drawSvg');
const drawSvgMocked = mocked(drawSvg);

import Graph from './graph';
import GraphPainter from './graphPainter';

import { 
  configs as basicConfigs, 
  results as basicResults, 
  graphDescription as basicGraphDescription 
} from './jestFixtures/graph/basicGraphExampleData';
import {
  configs as spacesConfigs,
  results as spacesResults,
  graphDescription as spacesGraphDescription,
  graphDescriptionArialed as spacesGraphDescriptionArialed
} from './jestFixtures/graph/spacesExampleData';

function markupToCleanArray(markup: string): string[] {
  return markup
    .split('\n')
    .map(line => line.trim())
    .filter(f => f);
}

function compareMarkups(markupSource, markupTarget) {
  const cleanMarkupSource = markupToCleanArray(markupSource);
  const cleanMarkupTarget = markupToCleanArray(markupTarget);

  for (let no = 0; no < cleanMarkupSource.length; no++) {
    expect(cleanMarkupSource[no]).toEqual(cleanMarkupTarget[no]);
  }

  expect(cleanMarkupSource.length).toEqual(cleanMarkupTarget.length);
}

describe('graphPainter', () => {
  it('tests generating graphviz markup (basic example)', () => {
    const myGraph = new Graph(basicConfigs);

    myGraph.setResults(basicResults);

    const graphPainter = new GraphPainter(myGraph);

    const input = graphPainter.generateMarkup();

    compareMarkups(basicGraphDescription, input);
  });

  it('tests generating graphviz markup for id with spaces', () => {
    const myGraph = new Graph(spacesConfigs);

    myGraph.setResults(spacesResults);

    const graphPainter = new GraphPainter(myGraph);

    const input = graphPainter.generateMarkup();

    compareMarkups(spacesGraphDescription, input);
  });

  it('tests generating graphviz markup for id with spaces and custom font', () => {
    process.env.CDR_SVG_FONTNAME = 'arial'; 
    const myGraph = new Graph(spacesConfigs);

    myGraph.setResults(spacesResults);

    const graphPainter = new GraphPainter(myGraph);

    const input = graphPainter.generateMarkup();

    compareMarkups(spacesGraphDescriptionArialed, input);
  });
});
