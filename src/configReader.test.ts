import { expect } from '@jest/globals';
import ConfigReader from './configReader';
import { IDescribeConfig } from './readFile';

const dirPath = 'src/jestFixtures/configReader/';
const globPattern = `${ dirPath }**/*.spec.js`;
let configReader: ConfigReader;

describe('configReader', () => {
  beforeEach(() => {
    configReader = new ConfigReader(globPattern);
  });

  it('tests getAllFileNames method', () => {
    const expectedResult = [
      `${ dirPath }1.spec.js`,
      `${ dirPath }2.spec.js`,
      `${ dirPath }someDir/4.spec.js`
    ];
    const notExpectedResult = [
      `${ dirPath }/3.nospec.js`,
    ];
    
    
    const fileNames = configReader.getAllFileNames();


    expectedResult.forEach(fileName => {
      expect(fileNames).toContain(fileName);
    });

    notExpectedResult.forEach(fileName => {
      expect(fileNames).not.toContain(fileName);
    });

    expect(fileNames.length).toEqual(3);
  });

  it('tests readAllFiles method', () => {
    const expectedResult: IDescribeConfig[] = [
      { id: '1' },
      { id: '2' },
      { id: '4' }
    ];
    const notExpectedResult: IDescribeConfig[] = [
      { id: '3' }
    ];
    

    const configs = configReader.readAllFiles();


    expectedResult.forEach(idcObject => {
      expect(configs).toContainEqual(idcObject);
    });

    notExpectedResult.forEach(idcObject => {
      expect(configs).not.toContainEqual(idcObject);
    });

    expect(configs.length).toEqual(3);
  });
});
