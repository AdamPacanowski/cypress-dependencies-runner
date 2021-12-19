import { 
  readFileSync,
  writeFileSync 
} from 'fs';
import { cwd } from 'process';
import { join } from 'path';

import { expect } from '@jest/globals';

import Graph from '../graph';
import indexFunctions from '../index';

import { 
  generateConfig,
  ids,
  order 
} from './cliInternal';


jest.mock('fs');
jest.mock('../index');

const mockReadFileSync = readFileSync as jest.MockedFunction<typeof readFileSync>;
const mockWriteFileSync = writeFileSync as jest.MockedFunction<typeof writeFileSync>; 
const mockIndexFunctions = indexFunctions as jest.Mocked<typeof indexFunctions>;

const currentCwd = cwd();
const testCwdPath = join(currentCwd, 'tests', 'cypress', 'integration');

describe('cli', () => {
  it('should return ids', () => {
    mockIndexFunctions.getAllIds.mockClear();
    mockIndexFunctions.getAllIds.mockReturnValue(['2', '1']);

    const results = ids({
      cwdPath: testCwdPath
    });

    // TODO Checking console.log displaying
    expect(mockIndexFunctions.getAllIds).toHaveBeenCalledTimes(1);
    expect(results).toEqual(['1', '2']);
  });

  it('should return order', () => {
    mockIndexFunctions.getGraph.mockClear();
    mockIndexFunctions.getFullOrder.mockClear();

    const graphMock = {a: 1} as unknown as Graph;
    mockIndexFunctions.getGraph.mockReturnValue(graphMock);

    const resultsMock = ['a', 'b'];
    mockIndexFunctions.getFullOrder.mockReturnValue(resultsMock);

    const results = order({
      cwdPath: testCwdPath
    });

    expect(mockIndexFunctions.getGraph).toHaveBeenCalledTimes(1);
    expect(mockIndexFunctions.getGraph).toHaveBeenCalledWith(testCwdPath);
    expect(mockIndexFunctions.getFullOrder).toHaveBeenCalledTimes(1);
    expect(mockIndexFunctions.getFullOrder).toHaveBeenCalledWith(graphMock);

    expect(results).toEqual(resultsMock);
  });

  it('should generate config', () => {
    mockIndexFunctions.getGraph.mockClear();
    mockIndexFunctions.getFullOrder.mockClear();
    mockReadFileSync.mockClear();
    mockWriteFileSync.mockClear();

    const graphMock = {
      a: 1,
      graph: {
        serialize: jest.fn()
      }
    } as unknown as Graph;
    mockIndexFunctions.getGraph.mockReturnValue(graphMock);

    const resultsMock = ['a', 'b'];
    mockIndexFunctions.getFullOrder.mockReturnValue(resultsMock);

    mockReadFileSync.mockReturnValue('{b: 1}');

    const config = 'current.config';
    const newConfig = 'testFileName.config';
    const newConfigData = JSON.stringify({
      b: 1,
      testFiles: ['a', 'b'],
      integrationFolder: '.'
    });
    generateConfig({
      cwdPath: testCwdPath,
      config: config,
      newConfig: newConfig
    });

    expect(mockIndexFunctions.getGraph).toHaveBeenCalledTimes(1);
    expect(mockIndexFunctions.getGraph).toHaveBeenCalledWith(testCwdPath);
    expect(mockIndexFunctions.getFullOrder).toHaveBeenCalledTimes(1);
    expect(mockIndexFunctions.getFullOrder).toHaveBeenCalledWith(graphMock, undefined, undefined);
    expect(mockReadFileSync).toHaveBeenCalledTimes(1);
    expect(mockReadFileSync).toHaveBeenCalledWith(config);
    expect(mockWriteFileSync).toHaveBeenCalledTimes(1);
    expect(mockWriteFileSync).toHaveBeenCalledWith(newConfig, newConfigData);
  });
});
