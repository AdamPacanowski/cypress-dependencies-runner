# cypress-dependency-runner

This package is helping to manage dependencies between cypress tests.

## Structure

- `tests` - example of cypress project with this library
- `testserver` - test server to handle order tests

### `src`

- `index.js` - This file you should import and call in your test. Should be configurable.
- `configReader.js` - class ConfigReader; reading configuration
- `graph.js` - class Graph; creation structure
- `drawableGraph.js` - class DrawableGraph; svg creation
- `resultsParser.js` - class ResultsParser; parsing cypress report
- `utils/readFile.js` - util to read file in specific way

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

## Useful links

https://dreampuf.github.io/

## Changelog

### 0.1.0

- First published version