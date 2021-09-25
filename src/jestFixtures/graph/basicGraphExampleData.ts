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

export const graphDescription = `                                                          
digraph G {                                                      
  {                                                              
    node [style=filled]                                          
    "1.1" [label=<                                                 
  <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="-6">             
      <TR><TD>1.1</TD></TR>                                      
      <TR><TD><FONT POINT-SIZE="8">(2/2)</FONT></TD></TR>        
  </TABLE>                                                       
  >][fillcolor=green]                                            
"1.2" [label=<                                                           
  <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="-6">             
      <TR><TD>1.2</TD></TR>                                      
      <TR><TD><FONT POINT-SIZE="8">(1/2)</FONT></TD></TR>        
  </TABLE>                                                       
  >][fillcolor=red]                                              
"2.1" [label=<                                                           
  <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="-6">             
      <TR><TD>2.1</TD></TR>                                      
      <TR><TD><FONT POINT-SIZE="8">(1/1)</FONT></TD></TR>        
  </TABLE>                                                       
  >][fillcolor=green]                                            
"2.2" [label=<                                                           
  <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="-6">             
      <TR><TD>2.2</TD></TR>                                      
      <TR><TD><FONT POINT-SIZE="8">(1/1)</FONT></TD></TR>        
  </TABLE>                                                       
  >][fillcolor=green]                                            
"3.3" [label=<                                                           
  <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="-6">             
      <TR><TD>3.3</TD></TR>                                      
      <TR><TD><FONT POINT-SIZE="8">(1/1)</FONT></TD></TR>        
  </TABLE>                                                       
  >][fillcolor=green]                                            
"2.3" [label=<                                                           
  <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="-6">             
      <TR><TD>2.3</TD></TR>                                      
      <TR><TD><FONT POINT-SIZE="8">(1/1)</FONT></TD></TR>        
  </TABLE>                                                       
  >][fillcolor=green]                                            
"2.4" [label=<                                                           
  <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="-6">             
      <TR><TD>2.4</TD></TR>                                      
      <TR><TD><FONT POINT-SIZE="8">(1/1)</FONT></TD></TR>        
  </TABLE>                                                       
  >][fillcolor=green]                                            
"3.1" [label=<                                                           
  <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="-6">             
      <TR><TD>3.1</TD></TR>                                      
      <TR><TD><FONT POINT-SIZE="8">(1/1)</FONT></TD></TR>        
  </TABLE>                                                       
  >][fillcolor=green]                                            
"3.2" [label=<                                                           
  <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="-6">             
      <TR><TD>3.2</TD></TR>                                      
      <TR><TD><FONT POINT-SIZE="8">(1/1)</FONT></TD></TR>        
  </TABLE>                                                       
  >][fillcolor=green]                                            
  }                                                              
  1.1 -> 1.2;                                                    
1.1 -> 2.1;                                                            
2.2 -> 2.1;                                                            
2.2 -> 3.3;                                                            
2.3 -> 2.1;                                                            
2.4 -> 1.2;                                                            
2.4 -> 2.2;                                                            
2.4 -> 3.1;                                                            
3.1 -> 3.2;                                                            
3.2 -> 3.3                                                             
}`;
