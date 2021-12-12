import path from 'path';
import { cwd } from 'process';

import { expect } from '@jest/globals';

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


    verify({
      expectedResult,
      notExpectedResult,
      result: fileNames,
      expectedLength: 4
    });
  });

  it('tests getAllFileNames method (with cwdPath and custom globPattern))', () => {
    configReader = new ConfigReader('**/*.spec.js');

    const expectedResult = [
      '4.spec.js'
    ];
    const notExpectedResult = [
      '1.spec.js',
      '2.spec.js',
      '3.nospec.js'
    ];


    const fileNames = configReader.getAllFileNames(
      `${ cwd() }\\${ dirPathBackSlashed }someDir`
    );


    verify({
      expectedResult,
      notExpectedResult,
      result: fileNames,
      expectedLength: 1
    });
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


    verify({
      expectedResult,
      notExpectedResult,
      result: configs,
      expectedLength: 4
    });
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


    verify({
      expectedResult,
      notExpectedResult,
      result: configsWithMetadata,
      expectedLength: 4
    });
  });

  it('tests resolveIds (not all entries, custom order)', () => {
    const expectedResult = [
      `${ cwd() }\\${ dirPathBackSlashed }someDir\\4.spec.js`,
      `${ cwd() }\\${ dirPathBackSlashed }1.spec.js`
    ];


    const paths = configReader.resolveIds(['4', '1']);


    expect(paths).toEqual(expectedResult);
  });

  it('tests resolveIds (with cwdPath)', () => {
    configReader = new ConfigReader('**/*.spec.js');
    const expectedResult: string[] = [
      `${ cwd() }\\${ dirPathBackSlashed }someDir\\4.spec.js`
    ];

    
    const paths = configReader.resolveIds(
      ['4'],
      `${ cwd() }\\${ dirPathBackSlashed }someDir`
    );


    expect(paths).toEqual(expectedResult);
  });

  it('tests getAllIds method', () => {
    configReader = new ConfigReader('**/*.spec.js');
    const expectedResult: string[] = ['1', '2', '4'];
    const fullDirPath = (`${ cwd() }\\${ dirPathBackSlashed }`);
    
    const results = configReader.getAllIds(fullDirPath);

    // expect(results).toEqual(expectedResult);
    // TODO fix
  });
});

function verify<T>({
  expectedResult,
  notExpectedResult,
  result,
  expectedLength
}: {
  expectedResult: T[],
  notExpectedResult: T[],
  result: T[],
  expectedLength: number
}) {
  expectedResult.forEach(expectedResultElement => {
    expect(result).toContainEqual(expectedResultElement);
  });
  notExpectedResult.forEach(notExpectedResultElement => {
    expect(result).not.toContainEqual(notExpectedResultElement);
  });

  expect(result.length).toEqual(expectedLength);
}
