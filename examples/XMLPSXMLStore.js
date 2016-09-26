'use strict';

var oo = require('substance/util/oo');
var request = require('substance/util/request');

function XMLPSXMLStore() {

}

XMLPSXMLStore.Prototype = function() {
  this.readXML = function(documentId, cb) {
    var cached = localStorage.getItem(documentId);
    if (cached) {
      return cb(null, cached);
    }
    request('GET', '/manager/xml/id/'+documentId, null, cb);
  };

  this.writeXML = function(documentId, xml, cb) {
    var data = {'content': xml};
    request('POST', '/manager/xml/id/'+documentId, data, cb);
  };
};

oo.initClass(XMLPSXMLStore);

module.exports = XMLPSXMLStore;
