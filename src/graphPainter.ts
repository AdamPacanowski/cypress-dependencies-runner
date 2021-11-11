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
    
    const getColorFragment = (nodeId: string) => {
      if (!this.myGraph.colors) {
        return '';
      }

      return `<TR><TD><FONT POINT-SIZE="8">(${ this.myGraph.colors[nodeId].text })</FONT></TD></TR>`;
    };

    const getFillColorFragment = (nodeId: string) => {
      if (!this.myGraph.colors) {
        return '';
      }

      return `[fillcolor=${ this.myGraph.colors[nodeId].color }]`;
    } 

    const nodes = serializedGraph
      .nodes.map(node => `"${ node.id }" [label=<
        <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="-6">
            <TR><TD>${ node.id }</TD></TR>
            ${ getColorFragment(node.id) }
        </TABLE>
        >]${ getFillColorFragment(node.id) }`);

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

  public async drawSVG(fileName?: string): Promise<string> {
    const input = this.generateMarkup();
    console.log('fileName', fileName);
    return drawSvg(input, fileName);
  }
}

export default GraphPainter;
