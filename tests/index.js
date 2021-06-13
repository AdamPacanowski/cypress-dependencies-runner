const path = require('path');
const cypress = require('cypress');
const CypressRunner = require('../index');
const ResultsParser = require('../resultsParser');

console.log(CypressRunner.getFullOrder());

// cypress.run({
//   config: {
//     // testFiles: ['1\\1.2.spec.js', '1\\1.1.spec.js']
//     testFiles: CypressRunner.getFullOrder()
//   }
// })
// .then((results) => {
//   console.log(results.runs);
// })

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
]

const resultsParser = new ResultsParser();

console.log(resultsParser.parse(results));
