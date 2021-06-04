const path = require('path');
const { cwd } = require('process');
const glob = require('glob');
const readFile = require('./readFile');

class ConfigReader {
  constructor(globPattern) {
    this.globPattern = globPattern;
  }

  getAllFileNames() {
    return glob.sync(this.globPattern, {
      ignore: '**/node_modules/**'
    });
  }

  readAllFiles() {
    const fileNames = this.getAllFileNames();

    const allConfigs = fileNames.map(fileName => {
      const fullPath = path.join(cwd(), fileName);

      return readFile(fullPath)
    });

    return allConfigs;
  }
}

module.exports = ConfigReader;
