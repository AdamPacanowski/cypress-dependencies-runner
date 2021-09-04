import { expect } from '@jest/globals';
import ConfigReader from './configReader';

describe('configReader', () => {
  it('tests getAllFileNames method', () => {
    const dirPath = 'src/jestFixtures/configReader/';
    const globPattern = `${ dirPath }**/*.spec.js`;
    const expectedResult = [
      `${ dirPath }1.spec.js`,
      `${ dirPath }2.spec.js`,
      `${ dirPath }someDir/4.spec.js`
    ];
    const notExpectedResult = [
      `${ dirPath }/3.nospec.js`,
    ];
    
    
    const configReader = new ConfigReader(globPattern);
    const fileNames = configReader.getAllFileNames();


    expectedResult.forEach(fileName => {
      expect(fileNames).toContain(fileName);
    });

    notExpectedResult.forEach(fileName => {
      expect(fileNames).not.toContain(fileName);
    });

    expect(fileNames.length).toEqual(3);
  });
});
