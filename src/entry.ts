import type * as cypressTyping from 'cypress';
import CypressRunner from './index';

export default (cypress: typeof cypressTyping) => {
  const myGraph = CypressRunner.run();

  cypress.run({
    config: {
      testFiles: CypressRunner.getFullOrder(myGraph)
    }
  }).then((results) => {
    const correctResults = results as CypressCommandLine.CypressRunResult;

    CypressRunner.draw(correctResults.runs, myGraph);
  });
};
