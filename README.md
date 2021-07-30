# cypress-dependency-runner

This package is helping to manage dependencies between cypress tests.

## Structure

- `index.js` - entry file 
- `graph.js` - class Graph
- `generateGraph.js` - entry for `npm run generate-graph` to remove ???
- `configReader.js` - class ConfigReader; read configuration to know which file should be runned

- `tests` - example of cypress project with this library
- `testserver` - test server to handle order tests

### How to use it?

1. `npm install --save-dev cypress-dependency-runner`
2. Go to your file (or create it) where you start test programmatically and inject `getFullOrder` method.

    e.g.
    ```
    const cypress = require('cypress');
    const CypressRunner = require('cypress-dependency-runner);

    cypress.run({
      config: {
        testFiles: CypressRunner.getFullOrder()
      }
    })
    .then((results) => {
      // ...
    })
    ```

3. Define in your spec files special comments which tell about dependecies.

    e.g.
    ```
    /***CypressRunner
      {
        "id": "1.1",
        "require": ["1.2"] 
      }
    */
    ```

## Changelog

### 0.1.0

- First published version