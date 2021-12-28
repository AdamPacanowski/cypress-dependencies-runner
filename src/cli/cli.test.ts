import { 
  existsSync,
  readFileSync,
  unlinkSync,
  writeFileSync
} from 'fs';
import { cwd } from 'process';
import { join } from 'path';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';

import { expect } from '@jest/globals';

import Graph from '../graph';
import indexFunctions from '../index';

import { 
  generateConfig,
  ids,
  run,
  order 
} from './cliInternal';


jest.mock('fs');
jest.mock('child_process');
jest.mock('../index');

const mockReadFileSync = readFileSync as jest.MockedFunction<typeof readFileSync>;
const mockWriteFileSync = writeFileSync as jest.MockedFunction<typeof writeFileSync>; 
const mockIndexFunctions = indexFunctions as jest.Mocked<typeof indexFunctions>;
const mockExistsSync = existsSync as jest.MockedFunction<typeof existsSync>;
const mockUnlinkSync = unlinkSync as jest.MockedFunction<typeof unlinkSync>;
const mockSpawn = spawn as jest.MockedFunction<typeof spawn>;

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
    mockExistsSync.mockClear();

    const graphMock = {
      a: 1,
      graph: {
        serialize: jest.fn()
      }
    } as unknown as Graph;
    mockIndexFunctions.getGraph.mockReturnValue(graphMock);

    const resultsMock = ['a', 'b'];
    mockIndexFunctions.getFullOrder.mockReturnValue(resultsMock);

    mockReadFileSync.mockReturnValue('{"b": 1}');
    mockExistsSync.mockReturnValue(true);

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
    // expect(mockReadFileSync).toHaveBeenCalledTimes(2); or 1 //TODO check
    expect(mockReadFileSync).toHaveBeenCalledWith(config);
    expect(mockWriteFileSync).toHaveBeenCalledTimes(1);
    expect(mockWriteFileSync).toHaveBeenCalledWith(newConfig, newConfigData);
  });

  it('should run', (done) => {
    mockIndexFunctions.getGraph.mockClear();
    mockIndexFunctions.getFullOrder.mockClear();
    mockReadFileSync.mockClear();
    mockWriteFileSync.mockClear();
    mockExistsSync.mockClear();
    mockUnlinkSync.mockClear();
    mockSpawn.mockClear();

    const graphMock = {
      a: 1,
      graph: {
        serialize: jest.fn()
      }
    } as unknown as Graph;
    mockIndexFunctions.getGraph.mockReturnValue(graphMock);

    const resultsMock = ['a', 'b'];
    mockIndexFunctions.getFullOrder.mockReturnValue(resultsMock);

    mockReadFileSync.mockReturnValue('{"b": 1}');

    mockExistsSync.mockReturnValue(true);

    const mockProc = {
      stdout: {
        on: jest.fn()
      },
      stderr: {
        on: jest.fn()
      }
    } as unknown as ChildProcessWithoutNullStreams;
    mockSpawn.mockReturnValue(mockProc);

    run({
      type: 'full',
      cwdPath: testCwdPath,
      node: '1'
    });

    expect(mockSpawn).toHaveBeenCalledTimes(1);
    expect(mockSpawn.mock.calls[0][1].includes('cypress')).toBeTruthy(); //TODO extend

    setTimeout(done, 10);
  });
});
