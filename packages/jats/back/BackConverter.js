'use strict';

var XMLIterator = require('../../../util/XMLIterator');
var BACK_CONTENT = ["ack", "app-group", "bio", "fn-group", "glossary", "ref-list", "notes", "sec"];

module.exports = {

  type: 'back',
  tagName: 'back',

  /*
    Content:
      label?, title*,
      (ack | app-group | bio | fn-group | glossary | ref-list | notes | sec)*
  */
  canContain: ["label", "title"].concat(BACK_CONTENT),

  import: function(el, node, converter) {
    node.id = 'back'; // There can only be one back item
    var iterator = new XMLIterator(el.getChildren());
    iterator.optional('label', function(child) {
      node.label = converter.convertElement(child).id;
    });
    iterator.manyOf('title', function(child) {
      node.titles.push(converter.convertElement(child).id);
    });
    iterator.manyOf(BACK_CONTENT, function(child) {
      node.nodes.push(converter.convertElement(child).id);
    });
    if (iterator.hasNext()) throw new Error('Illegal JATS: ' + el.outerHTML);
  },

  export: function(node, el, converter) {
    if(node.label) {
      el.append(converter.convertNode(node.label));
    }
    node.titles.forEach(function(nodeId) {
      el.append(converter.convertNode(nodeId));
    });
    node.nodes.forEach(function(nodeId) {
      el.append(converter.convertNode(nodeId));
    });
  }
};