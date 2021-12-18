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


jest.mock('../index');

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

  // it('should generate config', () => {

  // });
});
