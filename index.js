const CypressRunner = require('./src/index');

module.exports = (cypress, config) => {
  const myGraph = CypressRunner.run();

  cypress.run({
    config: {
      testFiles: CypressRunner.getFullOrder(myGraph)
    }
  }).then((results) => {
    console.log(results.runs);
  });
};
