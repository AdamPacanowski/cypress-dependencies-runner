import { expect } from '@jest/globals';
import path from 'path';
import readFile from './readFile';

describe('readFile', () => {
  it('tests bad example', () => {
    const filePath = path.resolve(__dirname, 'jestFixtures/readFile/badFile.js');

    const config = readFile(filePath);

    expect(config.id).toEqual('1.3');
    expect(config.require).toEqual(['1.1']);
  });
});
