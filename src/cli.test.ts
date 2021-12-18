import { cwd } from 'process';
import { join } from 'path';

import { expect } from '@jest/globals';

import { ids } from './cliInternal';

const currentCwd = cwd();
const testCwdPath = join(currentCwd, 'tests', 'cypress', 'integration');

describe('cli', () => {
  it('should return ids', () => {
    const result = ids({
      cwdPath: testCwdPath
    });

    expect(result.length).toEqual(10);
  });
});
