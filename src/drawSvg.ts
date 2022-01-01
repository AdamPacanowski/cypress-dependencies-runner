import { renderGraphFromSource } from 'graphviz-cli';
 
import { checkAndGetValue } from './parameters';

export default async (input, fileName) => {
  console.log('name', checkAndGetValue(fileName, 'outputSvgFileName'));
  return await renderGraphFromSource({
    input
  }, { 
    name: checkAndGetValue(fileName, 'outputSvgFileName'),
    format: 'svg' 
  });
};
