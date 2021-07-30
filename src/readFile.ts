import { readFileSync } from 'fs';

module.exports = function (filePath: string) {
  const regex = /\*\*\*CypressRunner.*(\{.*\}).*\*/gsm;
  
  const fileContent = readFileSync(filePath)
    .toString();

  const match = regex.exec(fileContent);

  // TODO validation
  const json = JSON.parse(match[1].trim());

  return json;
};