const axios = require('axios');
const cypress = require('cypress');
const CypressRunner = require('../built/entry').default;

axios.delete('http://localhost:3000')
  .then(() => {
    CypressRunner(cypress);
  });
