const path = require('path');
const { cwd } = require('process');

const readFile = require('./readFile');

const f11 = readFile(path.join(cwd(), 'tests/cypress/integration/1/1.1.spec.js'));
const f12 = readFile(path.join(cwd(), 'tests/cypress/integration/1/1.2.spec.js'));

const configs = [f11, f12];

console.log(configs);
