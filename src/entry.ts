import fs from 'fs';

import type * as cypressTyping from 'cypress';

import CypressRunner from './index';

interface ICypressRunOptions {
  config: object;
  env?: object;
}

export default (cypress: typeof cypressTyping, env: object, silent = false, cwdPath?: string) => {
  const myGraph = CypressRunner.getGraph(cwdPath);

  const options: ICypressRunOptions = {
    config: {
      testFiles: CypressRunner.getFullOrder(myGraph)
    }
  };

  if (env !== undefined) {
    options.env = env;
  }

  if (!silent) {
    console.log('cypress options:', options);
  }

  cypress.run(options).then((results) => {
    const correctResults = results as CypressCommandLine.CypressRunResult;

    CypressRunner.draw(correctResults.runs, myGraph);
  });
};
