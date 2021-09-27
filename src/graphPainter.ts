import consoleUtils from './consoleUtils';
import Graph from './graph';
import drawSvg from './drawSvg';

class GraphPainter {
  private myGraph: Graph;

  constructor(myGraph: Graph) {
    this.myGraph = myGraph;
  }

  public generateMarkup() {
    const serializedGraph = this.myGraph.graph.serialize();
    const graphConnections = serializedGraph
      .links.map(link => `"${ link.source }" -> "${ link.target }"`);    
    
    const nodes = serializedGraph
      .nodes.map(node => `"${ node.id }" [label=<
        <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="-6">
            <TR><TD>${ node.id }</TD></TR>
            <TR><TD><FONT POINT-SIZE="8">(${ this.myGraph.colors[node.id].text })</FONT></TD></TR>
        </TABLE>
        >][fillcolor=${ this.myGraph.colors[node.id].color }]`);

    let fontMarkup = '';

    if (process.env.CDR_SVG_FONTNAME) {
      fontMarkup = `,fontname="${ process.env.CDR_SVG_FONTNAME }"`;
    }

    const input = `
      digraph G {
        {
          node [style=filled${fontMarkup}]
          ${ nodes.join('\n') }
        }
        ${ graphConnections.join(';\n') }
      }
    `;
      console.log(input)
    return input;
  }

  public async drawSVG(): Promise<string> {
    const input = this.generateMarkup();

    consoleUtils.log(input);

    const fileName = process.env.CDR_SVG_FILE_NAME || 'graphFile';

    return drawSvg(input, fileName);
  }
}

export default GraphPainter;
