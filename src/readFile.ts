import { readFileSync } from 'fs';

export class ReadFileJSONParseError extends Error {
  filePath: string;

  constructor(filePath: string) {
    super(`Error when parsing ${ filePath }`);

    this.name = 'ReadFileJSONParseError';
    this.filePath = filePath;
  }
}

export interface IDescribeConfig {
  id: string;
  require?: string[];
};

function isIDescribeConfig(json: any): json is IDescribeConfig {
  const idExistance = json.id !== undefined;
  const idType = typeof json.id === 'string';

  if (!idExistance || !idType) {
    return false;
  }

  const requireIsArray = Array.isArray(json.require);

  if (!requireIsArray) {
    return true;
  }

  const requireType = (json.require as Array<any>).every(requireElement => {
    return typeof requireElement === 'string';
  });

  return requireType;
}

export default function (filePath: string): IDescribeConfig {
  const regex = /\*\*\*CypressRunner.*(\{.*\}).*\*\*\*/gsm;
  
  const fileContent = readFileSync(filePath).toString();

  const match = regex.exec(fileContent);

  let json;

  try {
    json = JSON.parse(match[1].trim());
  }
  catch (e) {
    throw new ReadFileJSONParseError(filePath);
  }

  if (!isIDescribeConfig(json)) {
    throw new Error(`Wrong describe config for ${ filePath }`);
  }

  return json;
};
