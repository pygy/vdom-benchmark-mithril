'use strict';

var benchmark = require('vdom-benchmark-base');
var m = require('mithril');

var NAME = 'mithril';
var VERSION = '0.2.0';

function renderTree(nodes) {
  var children = [];
  var i;
  var e;
  var n;

  for (i = 0; i < nodes.length; i++) {
    n = nodes[i];
    if (n.children !== null) {
      children.push({tag: 'div', attrs: {key: n.key}, children: renderTree(n.children)});
    } else {
      children.push({tag: 'span', attrs: {key: n.key}, children: n.key.toString()});
    }
  }

  return children;
}

function BenchmarkImpl(container, a, b) {
  this.container = container;
  this.a = a;
  this.b = b;
}

BenchmarkImpl.prototype.setUp = function() {
};

BenchmarkImpl.prototype.tearDown = function() {
  m.render(this.container, '', true);
};

BenchmarkImpl.prototype.render = function() {
  m.render(this.container, {tag: 'div', children: renderTree(this.a)});
};

BenchmarkImpl.prototype.update = function() {
  m.render(this.container, {tag: 'div', children: renderTree(this.b)});
};

document.addEventListener('DOMContentLoaded', function(e) {
  benchmark(NAME, VERSION, BenchmarkImpl);
}, false);
