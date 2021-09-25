import { expect } from '@jest/globals';
import path from 'path';
import readFile, { ReadFileJSONParseError } from './readFile';

describe('readFile', () => {
  it('tests bad example', () => {
    const filePath = path.resolve(__dirname, 'jestFixtures/readFile/badFile.js');

    const config = readFile(filePath);

    expect(config.id).toEqual('1.3');
    expect(config.require).toEqual(['1.1']);
  });

  it('tests empty file', () => {
    const filePath = path.resolve(__dirname, 'jestFixtures/readFile/fileWithoutTags.js');

    try {
      const config = readFile(filePath);

      new Error(`It shouldn't happen!`);
    }
    catch (e) {
      const error = e as ReadFileJSONParseError;

      expect(error.name).toEqual('ReadFileJSONParseError');
      expect(error.filePath).toEqual(filePath);
    }
  });
});
