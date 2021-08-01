import Graph from './graph';
import { renderGraphFromSource } from 'graphviz-cli'; 

class GraphPainter {
  private myGraph: Graph;

  constructor(myGraph: Graph) {
    this.myGraph = myGraph;
  }

  async drawSVG(): Promise<string> {
    console.log(this.myGraph.colors);

    const serializedGraph = this.myGraph.graph.serialize();
    const graphConnections = serializedGraph
      .links.map(link => `${ link.source } -> ${ link.target }`);    
    
    const nodes = serializedGraph
      .nodes.map(node => `${ node.id } [fillcolor=${ this.myGraph.colors[node.id] }]`);

    console.log(serializedGraph);
    console.log(this.myGraph.colors);

    const input = `
      digraph G {
        {
          node [style=filled]
          ${ nodes.join('\n') }
        }
        ${ graphConnections.join(';\n') }
      }
    `;
    console.log(input);
    const fileName = process.env.CDR_SVG_FILE_NAME || 'graphFile';

    return await renderGraphFromSource({
      input
    }, { 
      name: `${ fileName }.svg`,
      format: 'svg' 
    });
  }
}

export default GraphPainter;
