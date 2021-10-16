import type * as cypressTyping from 'cypress';
import fs from 'fs';
import CypressRunner from './index';

interface ICypressRunOptions {
  config: object;
  env?: object;
}

export default (cypress: typeof cypressTyping, env: object) => {
  const myGraph = CypressRunner.run();

  const options: ICypressRunOptions = {
    config: {
      testFiles: CypressRunner.getFullOrder(myGraph)
    }
  };

  if (env !== undefined) {
    options.env = env;
  }

  console.log('cypress options:', options);

  cypress.run(options).then((results) => {
    const correctResults = results as CypressCommandLine.CypressRunResult;
    console.log(results);
    CypressRunner.draw(correctResults.runs, myGraph);
  });
};
