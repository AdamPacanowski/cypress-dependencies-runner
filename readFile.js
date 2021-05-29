const fs = require('fs');


module.exports = (filePath) => {
  const regex = /\*\*\*CypressRunner.*(\{.*\}).*\*/gsm;
  
  const fileContent = fs.readFileSync(filePath)
    .toString();

  const match = regex.exec(fileContent);

  // TODO validation
  const json = JSON.parse(match[1].trim());

  return json;
};