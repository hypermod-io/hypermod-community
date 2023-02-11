# react#create-element-to-jsx

Converts calls to `React.createElement` into JSX elements.

_Credit_: [https://github.com/reactjs/react-codemod](https://github.com/reactjs/react-codemod)

```js
/* INPUT */
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

/* OUTPUT */
var React = require('react/addons');

<div>
  <span>
    <button>
      <a href="https://www.google.com">
        <audio />
      </a>
    </button>
    <br />
    <img />
  </span>
</div>;
```
