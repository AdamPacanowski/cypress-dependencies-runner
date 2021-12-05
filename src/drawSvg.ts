import { renderGraphFromSource } from 'graphviz-cli'; 
import { checkAndGetValue } from './parameters';

export default async (input, fileName) => {
  try {
    return await renderGraphFromSource({
      input
    }, { 
      name: checkAndGetValue(fileName, 'outputSvgFileName'),
      format: 'svg' 
    });
  }
  catch(e) {
    throw e;
  }
};
