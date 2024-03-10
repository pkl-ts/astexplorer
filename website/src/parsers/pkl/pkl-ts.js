import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from '@pkl-ts/parser/package.json';

const ID = 'pkl-ts';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: `${pkg.version}`,
  locationProps: new Set(['start', 'stop']),
  _ignoredProperties: new Set(['parent']),

  loadParser(callback) {
    require(['@pkl-ts/parser', '@pkl-ts/parser/dist/antlr.cjs'], callback);
  },

  parse(parsers, code, options={}) {
    console.log(parsers)
    console.log(code)
    parsers.pklParser()
  },

  nodeToRange(node) {
    return [node.start.tokenIndex, node.stop.tokenIndex];
  },

  getNodeName(node) {
    return node.constructor.name;
  }


};
