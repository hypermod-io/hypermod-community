import { applyTransform } from '@hypermod/utils';
import * as transformer from './transform';

describe('react#create element to jsx transform', () => {
  it('should transform create element to jsx arg spread', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('React');

React.createElement(Foo, null, ...children);
React.createElement(Foo, null, firstChild, ...otherChildren);
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx call as children', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('react/addons');

React.createElement('div', {}, foo());
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx call expression as prop', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('react/addons');

React.createElement('div', getProps(), 'foo');
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx children literal', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('React');

React.createElement('div', null, 'foo');
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx children', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('React');

var a = React.createElement(
  Foo,
  null,
  React.createElement('div', { foo: 'bar' }),
  React.createElement(
    'span',
    null,
    'blah'
  )
);
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx deep nesting', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('react/addons');

React.createElement(
  'div',
  {},
  React.createElement(
    'span',
    {},
    React.createElement(
      'button',
      {},
      React.createElement(
        'a',
        {href: 'https://www.google.com'},
        React.createElement('audio')
      )
    ),
    React.createElement('br'),
    React.createElement('img')
  )
);
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx ignore bad capitalization', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('React');

React.createElement(Foo);
React.createElement(foo);
React.createElement('Foo');
React.createElement('foo');
React.createElement(_foo);
React.createElement('_foo');
React.createElement(foo.bar);
React.createElement(Foo, null, React.createElement(foo));
`,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx literal prop', async () => {
    const result = await applyTransform(
      transformer,
      `
        import foo from 'react';
        console.log(foo);
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx literal spacing', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('react/addons');

const recipient = 'world';
React.createElement(
  'span',
  {},
  'Hello ',
  recipient
);
React.createElement(
  'span',
  {},
  'Water',
  recipient
);
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx member expression as prop', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('react/addons');

React.createElement('div', this.props, 'foo');
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx no props arg', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('React');

var a = React.createElement(Foo);
var b = React.createElement('div');
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx no react', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('foo');
React.createElement(Foo, 'la');
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx object assign', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('react/addons');

React.createElement(Foo, Object.assign({
  'foo': 'bar',
}, props, {
  'bar': 'foo',
}));
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx props array', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('react');

var foo = React.createElement(
  'div',
  {
    array: [],
  }
);
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx props boolean', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('React');

var a = React.createElement('div', { a: true });
var a = React.createElement('div', { a: 4 });
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx props', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('React');

function foo() {
  var a = React.createElement(Foo, { foo: 'bar', bar: this.state.baz });
  var b = React.createElement('div', { foo: 'bar', bar: this.state.baz });
}
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx react spread', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('react/addons');

React.createElement(Foo, React.__spread({
  'foo': 'bar',
}, props, {
  'bar': 'foo',
}));
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx single element', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('React');

var a = React.createElement(Foo, null);
var b = React.createElement('div', null);
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx spread props', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('React');

React.createElement(Constructor, props);
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should transform create element to jsx spread', async () => {
    const result = await applyTransform(
      transformer,
      `
var React = require('React');
React.createElement(Foo, {foo: 'bar', ...someObject});

      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });
});
