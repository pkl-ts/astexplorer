import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from '@pkl-ts/parser/package.json';

const ID = 'pkl-ts';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: `${pkg.version}`,
  locationProps: new Set(['start', 'stop']),
  _ignoredProperties: new Set(['parent', 'source']),

  loadParser(callback) {
    require(['@pkl-ts/parser', '@pkl-ts/parser/dist/antlr.cjs'], callback);
  },

  parse(parsers, code, options={}) {
    this.symbolicNames = parsers.PklTsParser.symbolicNames;
    this.ruleNames = parsers.PklTsParser.ruleNames;
    let stream = parsers.antlr.CharStream.fromString(code)
    let tree = parsers.pklParser(stream)
    return tree.replInput();
  },

  nodeToRange(node) {
    console.log(node)
    if (node.getSymbol) {
      let token = node.getSymbol();
      return [token.start, token.stop + 1]
    }
    if (node.start) {
      return [node.start.start, node.stop.stop + 1]
    }
    
  },

  getNodeName(node) {
    if (node.getSymbol && this.symbolicNames) {
      let token = node.getSymbol();
      let tokenType = token.type;
      return tokenType === -1 ? 'EOF' : this.symbolicNames[tokenType];
    }
    if (node._type) {
      return node._type
    }
    if (this.ruleNames && node.ruleIndex !== undefined)  {
      return this.ruleNames[node.ruleIndex];
    }
    return node.constructor.name;
  }


};
