/* eslint-disable no-undef */
import { execSync } from 'child_process';
import { resolve } from 'path';

import { renderGraphFromSource } from 'graphviz-cli';

const OUTPUT_FILENAME = 'depGraph.svg';

console.log('Generating dependencies graph...');

// https://github.com/sverweij/dependency-cruiser
const depcruiseBinary = resolve('./node_modules/.bin/depcruise');

let dotDiagramSource;

try {
  dotDiagramSource = execSync(`${ depcruiseBinary } --config dependencyCruise.json --output-type dot src`).toString();
} catch(e) {
  console.log(e);
}

renderGraphFromSource({
  input: dotDiagramSource
}, {
  name: OUTPUT_FILENAME,
  format: 'svg'
}).then(() => {
  process.exit(0);  
}).catch(() => {
  process.exit(1);
});

console.log(`Dependencies graph generated (${ OUTPUT_FILENAME }).`);
