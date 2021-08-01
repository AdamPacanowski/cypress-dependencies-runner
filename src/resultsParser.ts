import path from 'path';

export interface IResult {
  failures: number;
  passes: number;
  pending: number;
  tests: number;
  skipped: number;
  specAbsolutePath: string;
};

type CypressRunResultsRuns = CypressCommandLine.CypressRunResult['runs'];

class ResultsParser {
  constructor() {}

  parse(results: CypressRunResultsRuns): IResult[] {
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

export default ResultsParser;
