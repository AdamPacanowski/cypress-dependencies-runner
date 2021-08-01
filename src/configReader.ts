import * as glob from 'glob';
import * as path from 'path';
import { cwd } from 'process';

import readFile, { IDescribeConfig } from './readFile';

export interface IDescribeConfigWithMetaData extends IDescribeConfig {
  specAbsolutePath: string;
};

class ConfigReader {
  private globPattern: string = null;
  private idsMap: {
    [index: string]: string
  } = {};

  constructor(globPattern: string) {
    this.globPattern = globPattern;
  }

  getAllFileNames(): string[] {
    return glob.sync(this.globPattern, {
      ignore: '**/node_modules/**',
      nodir: true
    });
  }

  readAllFiles(): IDescribeConfig[] {
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

  readAllFilesWithMetadata(): IDescribeConfigWithMetaData[] {
    const allConfigs = this.readAllFiles();
    const fullPaths = this.resolveIds(allConfigs.map(a => a.id));

    const extendedAllConfigs: IDescribeConfigWithMetaData[] = [];

    for(let i = 0; i < allConfigs.length; i++) {
      extendedAllConfigs[i] = {
        ...allConfigs[i],
        specAbsolutePath: fullPaths[i]
      };
    }

    return extendedAllConfigs;
  }

  resolveIds(ids: string[]): string[] {
    if (!Object.keys(this.idsMap).length) {
      this.readAllFiles();
    }

    return ids.map(id => this.idsMap[id]);
  }
}

export default ConfigReader;
