/* eslint-disable @typescript-eslint/no-empty-function */
import chalk from 'chalk';
import yargs from 'yargs';

class ConsoleUtils {
  private static instance: ConsoleUtils;

  public infoEnabled = true;
  public logEnabled = false;
  public raw = false;

  public static getInstance() {
    if (!ConsoleUtils.instance) {
      ConsoleUtils.instance = new ConsoleUtils();

      if (yargs.argv.raw !== undefined) {
        ConsoleUtils.instance.raw = yargs.argv.raw as boolean;
      }

      if (yargs.argv.infoDisabled !== undefined) {
        ConsoleUtils.instance.infoEnabled = !yargs.argv.infoDisabled as boolean;
      }

      if (yargs.argv.logEnabled !== undefined) {
        ConsoleUtils.instance.logEnabled = yargs.argv.log as boolean;
      }
    }

    return ConsoleUtils.instance;
  }

  private getFullText(...args: any[]): string {
    if (this.raw) {
      return args.join(' ');
    }
  
    const currentTime = (new Date()).toLocaleTimeString();
    const currentTimeString = chalk.grey(`[${ currentTime }]`);
  
    let argsText = '';
  
    if (Array.isArray(args)) {
      argsText = args.join(' ');
    } else {
      argsText = args;
    }
  
    return `${ currentTimeString } ${ argsText }`;
  }

  public log(...args: any[]): void {
    if (!this.logEnabled) {
      return;
    }

    console.log(this.getFullText(...args));
  }

  public info(...args: any[]): void {
    if (!this.infoEnabled) {
      return;
    }

    console.info(this.getFullText(...args));
  }
}

export default ConsoleUtils.getInstance();
