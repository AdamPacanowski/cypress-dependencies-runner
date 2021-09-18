import consoleUtils from './consoleUtils';
import Graph from './graph';
import { renderGraphFromSource } from 'graphviz-cli'; 

class GraphPainter {
  private myGraph: Graph;

  constructor(myGraph: Graph) {
    this.myGraph = myGraph;
  }

  async drawSVG(): Promise<string> {
    const serializedGraph = this.myGraph.graph.serialize();
    const graphConnections = serializedGraph
      .links.map(link => `${ link.source } -> ${ link.target }`);    
    
    const nodes = serializedGraph
      .nodes.map(node => `${ node.id } [label=<
        <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="-6">
            <TR><TD>${ node.id }</TD></TR>
            <TR><TD><FONT POINT-SIZE="8">(${ this.myGraph.colors[node.id].text })</FONT></TD></TR>
        </TABLE>
        >][fillcolor=${ this.myGraph.colors[node.id].color }]`);

    const input = `
      digraph G {
        {
          node [style=filled]
          ${ nodes.join('\n') }
        }
        ${ graphConnections.join(';\n') }
      }
    `;

    consoleUtils.log(input);

    const fileName = process.env.CDR_SVG_FILE_NAME || 'graphFile';

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
}

export default GraphPainter;
