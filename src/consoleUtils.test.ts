import { expect } from '@jest/globals';

import consoleUtils from './consoleUtils';

describe('consoleUtils', () => {
  it('tests log function', () => {
    const consoleLog = jest.spyOn(console, 'log')
      .mockImplementation(() => {});

    consoleUtils.log('Test');

    const callArgument = consoleLog.mock.calls[0][0];
    expect(consoleLog).toBeCalledTimes(1);
    expect(callArgument).toContain('[');
    expect(callArgument).toContain(']');
    expect(callArgument).toContain('Test');
  });

  it('tests log function (args is array)', () => {
    const consoleLog = jest.spyOn(console, 'log')
      .mockImplementation(() => {});

    consoleUtils.log(['Test', 'Test2']);

    const callArgument = consoleLog.mock.calls[0][0];
    expect(consoleLog).toBeCalledTimes(1);
    expect(callArgument).toContain('[');
    expect(callArgument).toContain(']');
    expect(callArgument).toContain('Test Test2');
  });
});
