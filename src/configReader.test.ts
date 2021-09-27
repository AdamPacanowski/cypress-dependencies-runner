import { expect } from '@jest/globals';
import { cwd } from 'process';

import ConfigReader, { IDescribeConfigWithMetaData } from './configReader';
import { IDescribeConfig } from './readFile';

const dirPath = 'src/jestFixtures/configReader/';
const dirPathBackSlashed = dirPath.split('/').join('\\');
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
      `${ dirPath }10.spec.js`,
      `${ dirPath }someDir/4.spec.js`
    ];
    const notExpectedResult = [
      `${ dirPath }/3.nospec.js`
    ];
    
    
    const fileNames = configReader.getAllFileNames();


    expectedResult.forEach(fileName => {
      expect(fileNames).toContain(fileName);
    });

    notExpectedResult.forEach(fileName => {
      expect(fileNames).not.toContain(fileName);
    });

    expect(fileNames.length).toEqual(expectedResult.length);
  });

  it('tests readAllFiles method', () => {
    const expectedResult: IDescribeConfig[] = [
      { id: '1' },
      { id: '2' },
      { id: '4' },
      { 
        id: 'Last test',
        require: ["1", "2"]
      }
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

    expect(configs.length).toEqual(expectedResult.length);
  });

  it('tests readAllFilesWithMetadata', () => {
    const expectedResult: IDescribeConfigWithMetaData[] = [
      { 
        id: '1',
        specAbsolutePath: `${ cwd() }\\${ dirPathBackSlashed }1.spec.js`
      },
      { 
        id: '2',
        specAbsolutePath: `${ cwd() }\\${ dirPathBackSlashed }2.spec.js`
      },
      { 
        id: 'Last test',
        require: ["1", "2"],
        specAbsolutePath: `${ cwd() }\\${ dirPathBackSlashed }10.spec.js`
      },
      { 
        id: '4',
        specAbsolutePath: `${ cwd() }\\${ dirPathBackSlashed }someDir\\4.spec.js`
      }
    ];
    const notExpectedResult: IDescribeConfigWithMetaData[] = [
      { 
        id: '3',
        specAbsolutePath: `${ cwd() }\\${ dirPathBackSlashed }/3.nospec.js`
      }
    ];


    const configsWithMetadata = configReader.readAllFilesWithMetadata();


    expectedResult.forEach(idcwmObject => {
      expect(configsWithMetadata).toContainEqual(idcwmObject);
    });
    notExpectedResult.forEach(idcmwObject => {
      expect(configsWithMetadata).not.toContainEqual(idcmwObject);
    });

    expect(configsWithMetadata.length).toEqual(expectedResult.length);
  });

  it('tests resolveIds (not all entries, custom order)', () => {
    const expectedResult = [
      `${ cwd() }\\${ dirPathBackSlashed }someDir\\4.spec.js`,
      `${ cwd() }\\${ dirPathBackSlashed }1.spec.js`
    ];


    const paths = configReader.resolveIds(['4', '1']);


    expect(paths).toEqual(expectedResult);
  });
});
