import { expect } from '@jest/globals';
import { join } from 'path';
import { spawn } from 'child_process';
import { cwd } from 'process';
import { existsSync, readFileSync } from 'fs';

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
  
    proc.stderr.on('data', (chunk) => {
      chunks.push(chunk);
    });

    proc.stdout.on('end', () => {
      const output = Buffer.concat(chunks).toString();
  
      resolve(output);
    });
  });
}

describe('cli', () => {
  it('should return ids', async () => {
    const currentCwd = cwd();

    const result = await runCli([
      'ids',
      join(currentCwd, 'tests', 'cypress', 'integration')
    ]);

    // TODO Extend
    expect(result.split('\n').length).toEqual(12);
  });

  it('should return order', async () => {
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

  function expectToFileExists(filename) {
    let fileExistance = false;
    try {
      if (existsSync(filename)) {
        fileExistance = true;
      }
    } catch (err) {
      fail('SVG file doesnt exist');
    }

    expect(fileExistance).toBeTruthy();
  }

  it('should return empty diagram with default filename', async () => {
    const currentCwd = cwd();
    const result = await runCli([
      'draw',
      join(currentCwd, 'tests', 'cypress', 'integration')      
    ]);

    expect(result.includes('SVG file created!')).toBeTruthy();
    expectToFileExists('graphFile.svg');

    const svgFile = readFileSync('graphFile.svg').toString();
    const svgTagExistance = svgFile.includes('<svg');
    const gNo = (svgFile.match(/<g/g) || []).length;

    expect(svgTagExistance).toBeTruthy();
    expect(gNo).toEqual(21);
  });

  it('should return empty diagram with inputed filename', async () => {
    const currentCwd = cwd();
    const result = await runCli([
      'draw',
      join(currentCwd, 'tests', 'cypress', 'integration'),
      '--outputSvgFileName="mycustomname.svg"'   
    ]);

    expect(result.includes('SVG file created!')).toBeTruthy();
    expectToFileExists('mycustomname.svg');

    const svgFile = readFileSync('mycustomname.svg').toString();
    const svgTagExistance = svgFile.includes('<svg');
    const gNo = (svgFile.match(/<g/g) || []).length;

    expect(svgTagExistance).toBeTruthy();
    expect(gNo).toEqual(21);
  });

  it('should return diagram when resultsJson and filename defined', async () => {
    const currentCwd = cwd();
    const result = await runCli([
      'draw',
      join(currentCwd, 'tests', 'cypress', 'integration'),
      '--outputSvgFileName="mycustomname2.svg"',
      '--resultsJson="src/jestFixtures/cli/basicResults.json"'
    ]);

    expect(result.includes('SVG file created!')).toBeTruthy();
    expectToFileExists('mycustomname2.svg');  

    const svgFile = readFileSync('mycustomname2.svg').toString();
    const svgTagExistance = svgFile.includes('<svg');
    const gNo = (svgFile.match(/<g/g) || []).length;
    const someFillGreenColorApplied = svgFile.includes('fill="green"');

    expect(svgTagExistance).toBeTruthy();
    expect(gNo).toEqual(21);
    expect(someFillGreenColorApplied).toBeTruthy();
  });
});
