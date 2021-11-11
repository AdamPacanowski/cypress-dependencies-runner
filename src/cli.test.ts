import { expect } from '@jest/globals';
import { join } from 'path';
import { spawn } from 'child_process';
import { cwd } from 'process';

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
    expect(result.split('\n').length).toEqual(16);
  });

  it('tests order', async () => {
    const currentCwd = cwd();

    const result = await runCli([
      'order',
      join(currentCwd, 'tests', 'cypress', 'integration')
    ]);

    const json = JSON.parse(result) as string[];
    const order = ['3_0', '2.4', '3.1', '3.2', '2.3', '2.2', '3.3', '1.1', '2.1', '1.2'];

    json.forEach((entry, i) => {
      const normalizedCwd = currentCwd.split('\\').filter(f => f).join('|');
      const normalizedEntry = entry.split('\\').filter(f => f).join('|');

      expect(normalizedEntry).toMatch(new RegExp(`${ normalizedCwd }.*`));
      expect(normalizedEntry).toMatch(new RegExp(`.*${ order[i] }.spec.js`));
    });
  });  
});
