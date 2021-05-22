const cypress = require('cypress');

cypress.run({
  config: {
    testFiles: ['1\\1.2.spec.js', '1\\1.1.spec.js']
  }
})
.then((results) => {
  console.log(results);
})
