import * as path from 'path';
import { cwd } from 'process';

import * as glob from 'glob';

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

  getAllFileNames(cwdPath?: string): string[] {
    const globOptions: glob.IOptions = {
      ignore: '**/node_modules/**',
      nodir: true
    };

    if (cwdPath) {
      globOptions.cwd = cwdPath;
    }

    return glob.sync(this.globPattern, globOptions);
  }

  readAllFiles(cwdPath?: string): IDescribeConfig[] {
    this.idsMap = {};

    const realCwdPath = cwdPath || cwd();
    const fileNames = this.getAllFileNames(realCwdPath);

    const allConfigs = fileNames.map(fileName => {
      const fullPath = path.join(realCwdPath, fileName);
      const config = readFile(fullPath);

      this.idsMap[config.id] = fullPath;

      return config;
    });

    return allConfigs;
  }

  readAllFilesWithMetadata(cwdPath?: string): IDescribeConfigWithMetaData[] {
    const allConfigs = this.readAllFiles(cwdPath);
    const fullPaths = this.resolveIds(
      allConfigs.map(a => a.id),
      cwdPath
    );

    const extendedAllConfigs: IDescribeConfigWithMetaData[] = [];

    for(let i = 0; i < allConfigs.length; i++) {
      extendedAllConfigs[i] = {
        ...allConfigs[i],
        specAbsolutePath: fullPaths[i]
      };
    }

    return extendedAllConfigs;
  }

  getAllIds(cwdPath: string): string[] {
    console.log('cwdPath', cwdPath);
    const metadata = this.readAllFilesWithMetadata(cwdPath);

    const ids: string[] = [];
    metadata.forEach(metadataElement => {
      ids.push(metadataElement.id);

      if(metadataElement.require) {
        ids.push(...metadataElement.require);
      }
    });

    return ids;
  }

  resolveIds(ids: string[], cwdPath?: string): string[] {
    if (!Object.keys(this.idsMap).length) {
      this.readAllFiles(cwdPath);
    }

    return ids.map(id => this.idsMap[id]);
  }
}

export default ConfigReader;
