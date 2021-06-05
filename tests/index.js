const cypress = require('cypress');
const CypressRunner = require('../index');

console.log(CypressRunner.getFullOrder());

cypress.run({
  config: {
    // testFiles: ['1\\1.2.spec.js', '1\\1.1.spec.js']
    testFiles: CypressRunner.getFullOrder()
  }
})
.then((results) => {
  console.log(results.runs);
})
