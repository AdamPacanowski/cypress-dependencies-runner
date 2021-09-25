import { renderGraphFromSource } from 'graphviz-cli'; 

export default async (input, fileName) => {
  try {
    return await renderGraphFromSource({
      input
    }, { 
      name: `${ fileName }.svg`,
      format: 'svg' 
    });
  }
  catch(e) {
    throw e;
  }
}
