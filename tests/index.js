const { cwd } = require('process');
const { join } = require('path');
const axios = require('axios');
const cypress = require('cypress');
const CypressRunner = require('../built/entry').default;

axios.delete('http://localhost:3000')
  .then(() => {
    const cwdPath = join(cwd(), 'plopedScenarios', 'basic');
    CypressRunner(cypress, undefined, undefined, cwdPath);
  });
