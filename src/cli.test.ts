import { expect } from '@jest/globals';
import { join } from 'path';
import { spawn } from 'child_process';

// https://engineering.britebill.com/2018/10/30/end-to-end-testing-cli-apps-jest.html

function runCli(params) {
  return new Promise((resolve: (value: string) => void) => {
    const proc = spawn('node', [
      join('.', 'built', 'cli.js'),
      ...params
    ]);
  
    const chunks = [];
  
    proc.stdout.on('data', (chunk) => {
      chunks.push(chunk);
    });
  
    proc.stdout.on('end', () => {
      const output = Buffer.concat(chunks).toString();
  
      resolve(output);
    });
  });
}

describe('cli', () => {
  it('tests ids', async () => {
    const result = await runCli(['ids']);

    // TODO Extend
    expect(result.split('\n').length).toEqual(15);
  });
});
