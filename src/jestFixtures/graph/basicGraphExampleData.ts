import { IDescribeConfigWithMetaData } from "../../configReader";

export const configs: IDescribeConfigWithMetaData[] = [
  {
    id: '1.1',
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\1\\1.1.spec.js'
  },
  {
    id: '1.2',
    require: [ '1.1', '2.4' ],
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\1\\1.2.spec.js'
  },
  {
    id: '2.1',
    require: [ '1.1', '2.2', '2.3' ],
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\2\\2.1.spec.js'
  },
  {
    id: '2.2',
    require: [ '2.4' ],
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\2\\2.2.spec.js'
  },
  {
    id: '2.3',
    require: [],
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\2\\2.3.spec.js'
  },
  {
    id: '2.4',
    require: [],
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\2\\2.4.spec.js'
  },
  {
    id: '3.1',
    require: [ '2.4' ],
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\3\\3.1.spec.js'
  },
  {
    id: '3.2',
    require: [ '3.1' ],
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\3\\3.2.spec.js'
  },
  {
    id: '3.3',
    require: [ '3.2', '2.2' ],
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\3\\3.3.spec.js'
  }
]

export const results = [
  {
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\2\\2.4.spec.js',
    tests: 1,
    passes: 1,
    pending: 0,
    skipped: 0,
    failures: 0
  },
  {
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\3\\3.1.spec.js',
    tests: 1,
    passes: 1,
    pending: 0,
    skipped: 0,
    failures: 0
  },
  {
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\3\\3.2.spec.js',
    tests: 1,
    passes: 1,
    pending: 0,
    skipped: 0,
    failures: 0
  },
  {
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\2\\2.3.spec.js',
    tests: 1,
    passes: 1,
    pending: 0,
    skipped: 0,
    failures: 0
  },
  {
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\2\\2.2.spec.js',
    tests: 1,
    passes: 1,
    pending: 0,
    skipped: 0,
    failures: 0
  },
  {
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\3\\3.3.spec.js',
    tests: 1,
    passes: 1,
    pending: 0,
    skipped: 0,
    failures: 0
  },
  {
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\1\\1.1.spec.js',
    tests: 2,
    passes: 2,
    pending: 0,
    skipped: 0,
    failures: 0
  },
  {
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\2\\2.1.spec.js',
    tests: 1,
    passes: 1,
    pending: 0,
    skipped: 0,
    failures: 0
  },
  {
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\1\\1.2.spec.js',
    tests: 2,
    passes: 1,
    pending: 0,
    skipped: 0,
    failures: 1
  }
];
