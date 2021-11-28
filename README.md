# cypress-dependencies-runner

[![CI](https://github.com/AdamPacanowski/cypress-dependencies-runner/actions/workflows/main.yml/badge.svg)](https://github.com/AdamPacanowski/cypress-dependencies-runner/actions/workflows/main.yml)

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

## How to use it?

### by including to your code

1. `npm install --save-dev cypress-dependencies-runner`
2. Go to your file (or create it) where you start test programmatically and inject `getFullOrder` method.

    e.g.
    ```TBD```

3. Define in your spec files special comments which tell about dependecies.

    e.g.
    ```
    /***CypressRunner
      {
        "id": "1.1",
        "require": ["1.2"] 
      }
    ***/
    ```

### by CLI

#### Options

- `ids [cwdPath]`
  - get all ids which was parsed
- `generate-config [cwdPath] [newConfig] [config]`
  - generate config file
- `order [cwdPath]`
  - get order resulting from graph
- `draw [cwdPath] [resultsJson]`
  - draw (empty) diagram
- (to implement) `apply-order`
  - apply graph order to filenames
- (to describe) `run full`
- (to describe) `run only <node>`
- (to describe) `run roadto <node>`



##### WIP (Draft) How to use CLI

In your project directory

1. `npm install --save-dev cypress-dependencies-runner mochawesome mochawesome-merge`

2. `./node_modules/.bin/cypress-runner generate-config <absolutePathToCypressIntegrationDirectory> <absolutePathToNewConfigFile> (optional)<absolutePathToCypressConfigFile>`

3. `./node_modules/.bin/cypress run --config-file <absolutePathToNewConfigFile>  --reporter mochawesome --reporter-options reportDir="cypress/results",overwrite=false,html=false,json=true`

4. `./node_modules/.bin/mochawesome-merge "cypress/results/*.json" > mochawesome.json`

5. `./node_modules/.bin/cypress-runner draw <absolutePathToCypressIntegrationDirectory> (temporary)<absolutePathToCypressRootDirectory> <absolutePathToMochawesomeJson>`


## Changelog


### 0.5.2

- Add `silent` option

### 0.5.1

- Fixed another problem with spaces in id's

### 0.5.0

- Now you will get custom error when problem with parsing tags
- Fixed problem with spaces in id's
- Now you can set custom font in output image (`process.env.CDR_SVG_FONTNAME`)

### 0.4.0

- Change default tags
- Now you can pass `env` when you are starting tests

### 0.3.1

- Add simple readFile test

### 0.3.0

- First public version

### 0.1.0

- First published version