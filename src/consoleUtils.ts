import chalk from 'chalk';

export default {
  log: function (args: any): void {
    const currentTime = (new Date()).toLocaleTimeString();
    const currentTimeString = chalk.grey(`[${ currentTime }]`);

    let argsText = '';

    if (Array.isArray(args)) {
      argsText = args.join(' ');
    } else {
      argsText = args;
    }

    console.log(`${ currentTimeString } ${ argsText }`);
  }
};
