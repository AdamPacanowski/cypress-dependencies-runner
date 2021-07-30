const path = require('path');

class ResultsParser {
  constructor() {}

  parse(results) {
    const parsedResult = results.map(result => {
      return {
        specAbsolutePath: path.normalize(result.spec.absolute),
        tests: result.stats.tests,
        passes: result.stats.passes,
        pending: result.stats.pending,
        skipped: result.stats.skipped,
        failures: result.stats.failures
      }
    });

    return parsedResult;
  }
}

module.exports = ResultsParser;
