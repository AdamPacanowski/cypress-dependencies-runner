const path = require('path');
const { cwd } = require('process');
const glob = require('glob');
const readFile = require('./readFile');

class ConfigReader {
  constructor(globPattern) {
    this.globPattern = globPattern;
    this.idsMap = {};
  }

  getAllFileNames() {
    return glob.sync(this.globPattern, {
      ignore: '**/node_modules/**',
      nodir: true
    });
  }

  readAllFiles() {
    this.idsMap = {};

    const fileNames = this.getAllFileNames();

    const allConfigs = fileNames.map(fileName => {
      const fullPath = path.join(cwd(), fileName);
      const config = readFile(fullPath);

      this.idsMap[config.id] = fullPath;

      return config;
    });

    return allConfigs;
  }

  readAllFilesWithMetadata() {
    const allConfigs = this.readAllFiles();
    const fullPaths = this.resolveIds(allConfigs.map(a => a.id));

    for(let i = 0; i < allConfigs.length; i++) {
      allConfigs[i].specAbsolutePath = fullPaths[i];
    }

    return allConfigs;
  }

  resolveIds(ids) {
    if (!Object.keys(this.idsMap).length) {
      this.readAllFiles();
    }

    return ids.map(id => this.idsMap[id]);
  }
}

module.exports = ConfigReader;
