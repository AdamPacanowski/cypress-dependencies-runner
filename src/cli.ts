import { cwd } from 'process';
// import type * as cypressTyping from 'cypress';
import CypressRunner from './index';

const cwdPath = cwd();

console.log('cwdPath', cwdPath);

// const cypressPath = '../tests/node_modules/cypress/index.js';

// import(cypressPath)
//   .then((module: typeof cypressTyping) => {
//     module
//   });

const graph = CypressRunner.run(cwdPath);

console.log('fullOrder', CypressRunner.getFullOrder(graph));