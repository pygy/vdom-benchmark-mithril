'use strict';

var benchmark = require('vdom-benchmark-base');
var m = require('mithril');

var NAME = 'mithril';
var VERSION = '1.1.1';

function renderTree(nodes) {
  var children = [];
  var i;
  var n;

  for (i = 0; i < nodes.length; i++) {
    n = nodes[i];
    if (n.children !== null) {
      children.push(m.vnode('div', n.key, undefined, renderTree(n.children)));
    } else {
      children.push(m.vnode('div', n.key, undefined, undefined, n.key.toString()));
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
  m.render(this.container, []);
};

BenchmarkImpl.prototype.render = function() {
  m.render(this.container, [m.vnode('div', undefined, undefined, renderTree(this.a))]);
};

BenchmarkImpl.prototype.update = function() {
  m.render(this.container, [m.vnode('div', undefined, undefined, renderTree(this.b))]);
};

document.addEventListener('DOMContentLoaded', function(e) {
  benchmark(NAME, VERSION, BenchmarkImpl);
}, false);
