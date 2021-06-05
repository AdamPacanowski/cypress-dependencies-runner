const cypress = require('cypress');
const CypressRunner = require('<library_name>');

cypress.run({
  config: {
    testFiles: CypressRunner.getFullOrder()
  }
})
.then((results) => {
  // TBD
});
