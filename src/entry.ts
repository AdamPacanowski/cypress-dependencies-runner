import type * as cypressTyping from 'cypress';
import CypressRunner from './index';

const results = [  
  {
    stats: {
      suites: 1,
      tests: 2,
      passes: 0,
      pending: 0,
      skipped: 0,
      failures: 2,
      duration: 2373,
      startedAt: '2021-06-13T09:36:09.140Z',
      endedAt: '2021-06-13T09:36:11.513Z'
    },
    reporter: 'spec',
    reporterStats: {
      suites: 1,
      tests: 2,
      passes: 0,
      pending: 0,
      failures: 2,
      start: '2021-06-13T09:36:09.145Z',
      end: '2021-06-13T09:36:11.559Z',
      duration: 2414
    },
    error: null,
    video: 'C:\\Software\\CypressRunner\\tests\\cypress\\videos\\1\\1.2.spec.js.mp4',
    spec: {
      name: '1/1.2.spec.js',
      relative: 'cypress/integration/1/1.2.spec.js',
      absolute: 'C:/Software/CypressRunner/tests/cypress/integration/1/1.2.spec.js',
      specType: 'integration'
    },
    shouldUploadVideo: true
  },
  {
    stats: {
      suites: 1,
      tests: 2,
      passes: 0,
      pending: 0,
      skipped: 1,
      failures: 1,
      duration: 1211,
      startedAt: '2021-06-13T09:36:18.952Z',
      endedAt: '2021-06-13T09:36:20.163Z'
    },
    reporter: 'spec',
    reporterStats: {
      suites: 1,
      tests: 1,
      passes: 0,
      pending: 0,
      failures: 1,
      start: '2021-06-13T09:36:18.956Z',
      end: '2021-06-13T09:36:20.186Z',
      duration: 1230
    },
    error: null,
    video: 'C:\\Software\\CypressRunner\\tests\\cypress\\videos\\1\\1.1.spec.js.mp4',
    spec: {
      name: '1/1.1.spec.js',
      relative: 'cypress/integration/1/1.1.spec.js',
      absolute: 'C:/Software/CypressRunner/tests/cypress/integration/1/1.1.spec.js',
      specType: 'integration'
    },
    shouldUploadVideo: true
  }
];

export default (cypress: typeof cypressTyping) => {
  const myGraph = CypressRunner.run();

  // CypressRunner.draw(results, myGraph);
  cypress.run({
    config: {
      testFiles: CypressRunner.getFullOrder(myGraph)
    }
  }).then((results) => {
    const correctResults = results as CypressCommandLine.CypressRunResult;

    console.log(correctResults.runs);

    CypressRunner.draw(correctResults.runs, myGraph);
  });
};