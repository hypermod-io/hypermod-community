import { applyTransform } from '@codeshift/test-utils';
import * as transformer from './transform';

describe('react#error-boundaries transform', () => {
  it('should transform class to error boundary', async () => {
    const result = await applyTransform(
      transformer,
      `
import React from "react";

export class ComponentOne extends React.Component {
  unstable_handleError(error) {}
  render() {
    return <div />;
  }
}

export class ComponentTwo extends React.Component {
  unstable_handleError = error => {};
  render() {
    return <div />;
  }
}
`,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from "react"; export class ComponentOne extends React.Component
      { componentDidCatch(error) {} render() { return
      <div />; } } export class ComponentTwo extends React.Component { componentDidCatch
      = error => {}; render() { return
      <div />; } }
    `);
  });

  it('should transform createClass to error boundary', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require("react");
var createClass = require("create-react-class");

var ComponentOne = createClass({
  render: function() {
    return <div />;
  },
  unstable_handleError: function(error) {}
});

var ComponentTwo = createClass({
  render() {
    return <div />;
  },
  unstable_handleError(error) {}
});
`,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`
      var React = require("react"); var createClass = require("create-react-class");
      var ComponentOne = createClass({ render: function() { return
      <div />; }, componentDidCatch: function(error) {} }); var ComponentTwo = createClass({
      render() { return
      <div />; }, componentDidCatch(error) {} });
    `);
  });
});
