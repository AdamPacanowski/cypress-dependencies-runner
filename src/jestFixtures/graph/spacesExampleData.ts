import { IDescribeConfigWithMetaData } from "../../configReader";

export const configs: IDescribeConfigWithMetaData[] = [
  {
    id: '3 space 0',
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\3\\3_space_0.spec.js'
  }
];

export const results = [
  {
    specAbsolutePath: 'C:\\Software\\CypressRunner\\tests\\cypress\\integration\\3\\3_space_0.spec.js',
    tests: 1,
    passes: 1,
    pending: 0,
    skipped: 0,
    failures: 0
  }
];

export const graphDescription= `                                                            
digraph G {                                                      
  {                                                              
    node [style=filled]                                          
    "3 space 0" [label=<                                                 
  <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="-6">             
      <TR><TD>3 space 0</TD></TR>                                      
      <TR><TD><FONT POINT-SIZE="8">(1/1)</FONT></TD></TR>        
  </TABLE>                                                       
  >][fillcolor=green]                                          
  }                                                             
}`;

export const graphDescriptionArialed= `                                                            
digraph G {                                                      
  {                                                              
    node [style=filled,fontname="arial"]                                          
    "3 space 0" [label=<                                                 
  <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="-6">             
      <TR><TD>3 space 0</TD></TR>                                      
      <TR><TD><FONT POINT-SIZE="8">(1/1)</FONT></TD></TR>        
  </TABLE>                                                       
  >][fillcolor=green]                                          
  }                                                             
}`;

