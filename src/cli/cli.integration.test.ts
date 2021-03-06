import _ from 'lodash';
import { join } from 'path';
import { spawn } from 'child_process';
import { cwd } from 'process';
import { existsSync, readFileSync } from 'fs';
import { expect } from '@jest/globals';
import consoleUtils from '../consoleUtils';

// https://engineering.britebill.com/2018/10/30/end-to-end-testing-cli-apps-jest.html

function runCli(params) {
  return new Promise((resolve: (value: string) => void) => {
    const proc = spawn('node', [
      join('.', 'built', 'cli', 'cli.js'),
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
  
      if (output.includes('Error')) {
        console.error(output);
        throw new Error('Error in console output found!');
      }

      resolve(output);
    });
  });
}

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

describe('cli (called from console)', () => {
  it('should return ids', async () => {
    const currentCwd = cwd();

    const result = await runCli([
      'ids',
      join(currentCwd, 'tests', 'cypress', 'integration'),
      '--raw'
    ]);

    const parsedResult = JSON.parse(result) as string[];

    expect(parsedResult.length).toEqual(10);
  });

  it('should return order', async () => {
    const currentCwd = cwd();
    const result = await runCli([
      'order',
      join(currentCwd, 'tests', 'cypress', 'integration'),
      '--raw'
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
      '--resultsJson="src/jestFixtures/cli/basicResults.ploped.json"'
    ]);
    console.log(result);
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

  it('should return config', async () => {
    const currentCwd = cwd();
    const newConfigFileName = 'newConfig.json';
    const result = await runCli([
      'generate-config',
      join(currentCwd, 'tests', 'cypress', 'integration'),
      newConfigFileName
    ]);

    expect(result.includes(`Saved to ${ newConfigFileName }`));
    expectToFileExists(newConfigFileName);

    // TODO typings
    const configCreated = JSON.parse(readFileSync(newConfigFileName).toString());
    const order = ['3_0', '2.4', '3.1', '3.2', '2.3', '2.2', '3.3', '1.1', '2.1', '1.2'];

    for (let i=0; i<order.length; i++) {
      expect((configCreated.testFiles[i] as string).includes(order[i])).toBeTruthy();
    }
  });

  // it('should return merged config', async () => {
    // TODO
  // });
});
