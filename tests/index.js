const cypress = require('cypress');
const CypressRunner = require('../built/entry').default;

CypressRunner(cypress);

