const ConfigReader = require('./configReader');

// const f11 = readFile(path.join(cwd(), 'tests/cypress/integration/1/1.1.spec.js'));
// const f12 = readFile(path.join(cwd(), 'tests/cypress/integration/1/1.2.spec.js'));

// const configs = [f11, f12, {
//   id: '1.3',
//   require: ['1.2']
// }, {
//   id: '1.4',
//   require: ['1.3']
// }, {
//   id: '1.5',
//   require: ['1.1']
// }, {
//   id: '1.6',
//   require: ['1.4', '1.5']
// }, {
//   id: '2.1',
//   require: ['1.1']
// }];

const configReader = new ConfigReader('**/*.spec.js');
// const myGraph = new Graph(configs);

// console.log(myGraph.hasCycle());
// console.log('aaa', myGraph.getAllRouteBetweenTwoPaths('1.2', '1.6'))

console.log(configReader.getAllFileNames());
console.log(configReader.readAllFiles());

// myGraph.drawSVG().then(() => {
//   console.log('Script done.');
// });