"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[6486],{5680:(e,n,t)=>{t.d(n,{xA:()=>u,yg:()=>d});var r=t(6540);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=r.createContext({}),l=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):p(p({},n),e)),t},u=function(e){var n=l(e.components);return r.createElement(s.Provider,{value:n},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},g=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=l(t),g=o,d=c["".concat(s,".").concat(g)]||c[g]||m[g]||a;return t?r.createElement(d,p(p({ref:n},u),{},{components:t})):r.createElement(d,p({ref:n},u))}));function d(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,p=new Array(a);p[0]=g;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i[c]="string"==typeof e?e:o,p[1]=i;for(var l=2;l<a;l++)p[l]=t[l];return r.createElement.apply(null,p)}return r.createElement.apply(null,t)}g.displayName="MDXCreateElement"},8683:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>p,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var r=t(8168),o=(t(6540),t(5680));const a={id:"react",title:"React & JSX",slug:"/react",description:"Learn how to use codemods to modify your React and JSX code. This guide covers inserting or removing props, wrapping components, and managing render props.",keywords:["react","typescript","codemod","codemorph","jscodeshift"]},p=void 0,i={unversionedId:"recipes/react",id:"recipes/react",title:"React & JSX",description:"Learn how to use codemods to modify your React and JSX code. This guide covers inserting or removing props, wrapping components, and managing render props.",source:"@site/docs/recipes/react.mdx",sourceDirName:"recipes",slug:"/react",permalink:"/docs/react",draft:!1,editUrl:"https://github.com/hypermod-io/hypermod-community/edit/main/website/docs/recipes/react.mdx",tags:[],version:"current",frontMatter:{id:"react",title:"React & JSX",slug:"/react",description:"Learn how to use codemods to modify your React and JSX code. This guide covers inserting or removing props, wrapping components, and managing render props.",keywords:["react","typescript","codemod","codemorph","jscodeshift"]},sidebar:"docs",previous:{title:"Import manipulation",permalink:"/docs/import-manipulation"},next:{title:"TypeScript",permalink:"/docs/typescript"}},s={},l=[{value:"Props",id:"props",level:2},{value:"Inserting a boolean prop",id:"inserting-a-boolean-prop",level:3},{value:"Inserting a string prop",id:"inserting-a-string-prop",level:3},{value:"Removing props",id:"removing-props",level:3},{value:"Updating props",id:"updating-props",level:3},{value:"Renaming props",id:"renaming-props",level:3},{value:"Spread props",id:"spread-props",level:3},{value:"JSX",id:"jsx",level:2},{value:"Wrapping components",id:"wrapping-components",level:3},{value:"Inserting children nodes",id:"inserting-children-nodes",level:3},{value:"Render props",id:"render-props",level:3}],u=(c="Head",function(e){return console.warn("Component "+c+" was not imported, exported, or provided by MDXProvider as global scope"),(0,o.yg)("div",e)});var c;const m={toc:l},g="wrapper";function d(e){let{components:n,...t}=e;return(0,o.yg)(g,(0,r.A)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,o.yg)(u,{mdxType:"Head"},(0,o.yg)("title",null,"React & JSX"),(0,o.yg)("link",{rel:"canonical",href:"https://hypermod.io/docs/guides/react-jsx"})),(0,o.yg)("admonition",{type:"info"},(0,o.yg)("p",{parentName:"admonition"},"This guide has been moved to a new location. Please visit the new ",(0,o.yg)("a",{parentName:"p",href:"https://hypermod.io/docs/guides/react-jsx"},"React & JSX guide"),".")),(0,o.yg)("p",null,"Codemods are an ideal solution for making significant changes to ",(0,o.yg)("a",{parentName:"p",href:"https://reactjs.org/"},"React")," and JSX code.\nThe structure of JSX makes it easy for static analysis tools to understand and analyze,\nmaking it a popular choice for authors of React libraries, such as Design Systems.\nBy providing codemods to users, they can streamline adoption, ensuring that component\nusage remains current and secure as the components evolve."),(0,o.yg)("p",null,"This guide provides information on transforming React and JSX code,\nincluding inserting or removing props, wrapping components, and managing render props.\nWith the help of these techniques, you can make changes to your codebase with ease and confidence."),(0,o.yg)("h2",{id:"props"},"Props"),(0,o.yg)("p",null,"Props in jscodeshift are represented by the ",(0,o.yg)("inlineCode",{parentName:"p"},"j.JSXAttribute")," node type, these can be as a simple array on JSX elememts (",(0,o.yg)("inlineCode",{parentName:"p"},"j.JSXElement"),")."),(0,o.yg)("p",null,"It's important to remember props can be represented an a few different forms, their AST counterparts will change to match."),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("a",{parentName:"li",href:"https://reactjs.org/docs/jsx-in-depth.html#props-default-to-true"},"Boolean props"),": ",(0,o.yg)("inlineCode",{parentName:"li"},"isDisabled")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("a",{parentName:"li",href:"https://reactjs.org/docs/jsx-in-depth.html#string-literals"},"String props"),": ",(0,o.yg)("inlineCode",{parentName:"li"},'className="hello"')),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("a",{parentName:"li",href:"https://reactjs.org/docs/jsx-in-depth.html#javascript-expressions-as-props"},"Expression props"),": ",(0,o.yg)("inlineCode",{parentName:"li"},"counter={5+4}"))),(0,o.yg)("h3",{id:"inserting-a-boolean-prop"},"Inserting a boolean prop"),(0,o.yg)("p",null,"Insert a new boolean prop ",(0,o.yg)("inlineCode",{parentName:"p"},"isDisabled"),"."),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Transform:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  source\n    .find(j.JSXElement)\n    // Find all components called button\n    .filter(path => path.value.openingElement.name.name === 'button')\n    .forEach(element => {\n      element.node.openingElement.attributes = [\n        ...element.node.openingElement.attributes,\n        // build and insert our new prop\n        j.jsxAttribute(j.jsxIdentifier('isDisabled')),\n      ];\n    });\n\n  return source.toSource();\n}\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Input:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\n\nconst Button = props => {\n  return <button>Submit</button>;\n};\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Output:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-diff"},"import React from 'react';\n\nconst Button = props => {\n-  return <button>Submit</button>;\n+  return <button isDisabled>Submit</button>;\n};\n")),(0,o.yg)("h3",{id:"inserting-a-string-prop"},"Inserting a string prop"),(0,o.yg)("p",null,"Insert a new string prop ",(0,o.yg)("inlineCode",{parentName:"p"},"className"),"."),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Transform:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  source\n    .find(j.JSXElement)\n    // Find all components called button\n    .filter(path => path.value.openingElement.name.name === 'button')\n    .forEach(element => {\n      element.node.openingElement.attributes = [\n        ...element.node.openingElement.attributes,\n        // build and insert our new prop\n        j.jsxAttribute(\n          j.jsxIdentifier('className'),\n          j.stringLiteral('helloWorld'),\n        ),\n      ];\n    });\n\n  return source.toSource();\n}\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Input:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\n\nconst Button = props => {\n  return <button>Submit</button>;\n};\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Output:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-diff"},"import React from 'react';\n\nconst Button = props => {\n-  return <button>Submit</button>;\n+  return <button className=\"helloWorld\">Submit</button>;\n};\n")),(0,o.yg)("h3",{id:"removing-props"},"Removing props"),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Transform:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  source\n    .find(j.JSXElement)\n    .filter(path => path.value.openingElement.name.name === 'button') // Find all button jsx elements\n    .find(j.JSXAttribute) // Find all attributes (props) on the button\n    .filter(path => path.node.name.name === 'onClick') // Filter to only props called onClick\n    .remove(); // Remove everything that matched\n\n  return source.toSource();\n}\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Input:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\n\nconst Button = props => {\n  return (\n    <button className=\"button\" onClick={() => console.log('Hello, World!')}>\n      Submit\n    </button>\n  );\n};\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Output:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-diff"},"import React from 'react';\n\nconst Button = props => {\n-  return <button className=\"button\" onClick={() => console.log('Hello, World!')}>Submit</button>;\n+  return <button className=\"button\">Submit</button>;\n};\n")),(0,o.yg)("h3",{id:"updating-props"},"Updating props"),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Transform:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  source\n    .find(j.JSXElement)\n    .filter(path => path.value.openingElement.name.name === 'button') // Find all button jsx elements\n    .find(j.JSXAttribute) // Find all attributes (props) on the button\n    .filter(attribute => attribute.node.name.name === 'className') // Filter to only props called className\n    .find(j.Literal) // Narrow further to the literal value (note: This may not always be a Literal)\n    .forEach(literal => {\n      literal.node.value = literal.node.value + ' button-primary';\n    }); // Mutate the value using the current value\n\n  return source.toSource();\n}\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Input:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\n\nconst Button = props => {\n  return <button className=\"button\">Submit</button>;\n};\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Output:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-diff"},'import React from \'react\';\n\nconst Button = props => {\n-  return <button className="button">Submit</button>;\n+  return <button className="button button-primary">Submit</button>;\n};\n')),(0,o.yg)("h3",{id:"renaming-props"},"Renaming props"),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Transform:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  source\n    .find(j.JSXElement)\n    .filter(path => path.value.openingElement.name.name === 'button') // Find all button jsx elements\n    .find(j.JSXAttribute) // Find all attributes (props) on the button\n    .filter(attribute => attribute.node.name.name === 'data-foo') // Filter to only props called data-foo\n    .forEach(attribute =>\n      j(attribute).replaceWith(\n        j.jsxAttribute(j.jsxIdentifier('data-bar'), attribute.node.value),\n      ),\n    ); // Reconstruct the attribute, replacing the name and keeping the value\n\n  return source.toSource();\n}\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Input:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\n\nconst Button = props => {\n  return <button data-foo=\"bar\">Submit</button>;\n};\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Output:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-diff"},'import React from \'react\';\n\nconst Button = props => {\n-  return <button data-foo="bar">Submit</button>;\n+  return <button data-bar="bar">Submit</button>;\n};\n')),(0,o.yg)("h3",{id:"spread-props"},"Spread props"),(0,o.yg)("p",null,"Spread props (aka ",(0,o.yg)("a",{parentName:"p",href:"https://reactjs.org/docs/jsx-in-depth.html#spread-attributes"},"spread attributes"),"),\nallow you to pass an entire object into a jsx element as props."),(0,o.yg)("p",null,"They are represented by the following notation:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-jsx"},"function App() {\n  const props = { firstName: 'Ben', lastName: 'Hector' };\n  return <Greeting {...props} />;\n}\n")),(0,o.yg)("p",null,"As an AST, these are represented by the ",(0,o.yg)("inlineCode",{parentName:"p"},"j.JSXSpreadAttribute")," node,\nwhich accepts an ",(0,o.yg)("inlineCode",{parentName:"p"},"j.Identifier")," (name) and ",(0,o.yg)("inlineCode",{parentName:"p"},"j.ObjectExpression")," (props)."),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Transform:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n  const props = [];\n\n  source\n    // Find all jsx elements with the name \"button\"\n    .find(j.JSXElement)\n    .filter(path => path.node.openingElement.name.name === 'button')\n    // Collect all of their props\n    .forEach(path => props.push(...path.node.openingElement.attributes))\n    // Now get all of the jsx attributes (props)...\n    .find(j.JSXAttribute)\n    // And replace them with a spread attribute called \"props\" for example `{...props}`\n    .forEach(path => path.replace(j.jsxSpreadAttribute(j.identifier('props'))));\n\n  // Create a new constant variable named props.\n  const variableDeclaration = j.variableDeclaration('const', [\n    j.variableDeclarator(\n      j.identifier('props'),\n      // the variable will be assigned an object containing all of the props from button\n      j.objectExpression(\n        props.map(prop =>\n          j.objectProperty(\n            j.identifier(prop.name.name),\n            j.stringLiteral(prop.value.value),\n          ),\n        ),\n      ),\n    ),\n  ]);\n\n  // Finally, we find the arrow function expression\n  source\n    .find(j.ArrowFunctionExpression)\n    // We then retrieve its body, which is the \"block scope\" of the component\n    .get('body')\n    // Since elements in a block are an array, we need to insert our new variable using unshift because we want it to be first\n    .value.body.unshift(variableDeclaration);\n\n  return source.toSource();\n}\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Input:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\n\nconst Button = () => {\n  return <button className=\"button\">Submit</button>;\n};\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Output:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-diff"},"import React from 'react';\n\nconst Button = () => {\n+  const props = { className: 'button' };\n-  return <button className=\"button\">Submit</button>;\n+  return <button {...props}>Submit</button>;\n};\n")),(0,o.yg)("h2",{id:"jsx"},"JSX"),(0,o.yg)("h3",{id:"wrapping-components"},"Wrapping components"),(0,o.yg)("p",null,"Wrapping react components with react components is a fairly common operation."),(0,o.yg)("p",null,"Simply follow this fairly simple set of steps:"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"Find the component you want to wrap"),(0,o.yg)("li",{parentName:"ol"},"Create a new component and pass the component to be wrapped in as a child node"),(0,o.yg)("li",{parentName:"ol"},"Replace the original component with a wrapped version of itself")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Transform:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  // Find all components named \"Avatar\"\n  source.findJSXElements('Avatar').forEach(element => {\n    // Create a new JSXElement called \"Tooltip\" and use the original Avatar component as children\n    const wrappedAvatar = j.jsxElement(\n      j.jsxOpeningElement(j.jsxIdentifier('Tooltip'), [\n        // Create a prop on the tooltip so it works as expected\n        j.jsxAttribute(\n          j.jsxIdentifier('content'),\n          j.stringLiteral('Hello, there!'),\n        ),\n      ]),\n      j.jsxClosingElement(j.jsxIdentifier('Tooltip')),\n      [element.value], // Pass in the original component as children\n    );\n\n    j(element).replaceWith(wrappedAvatar);\n  });\n\n  return source.toSource();\n}\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Input:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-jsx"},"import { Avatar, Tooltip } from 'component-lib';\n\nconst App = () => {\n  return <Avatar name=\"foo\" />;\n};\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Output:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-diff"},'import {Avatar, Tooltip } from \'component-lib\';\n\nconst App = () => {\n  return (\n+    <Tooltip content="foo">\n      <Avatar name="foo" />\n+    </Tooltip>\n  );\n}\n')),(0,o.yg)("h3",{id:"inserting-children-nodes"},"Inserting children nodes"),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Transform:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  source\n    .find(j.JSXElement) // Find all jsx elements\n    .filter(path => path.node.openingElement.name.name === 'ul') // filter to an array of only ul elements\n    .forEach(path =>\n      // Replace each ul element with a modified version of itself\n      path.replace(\n        j.jsxElement(path.node.openingElement, path.node.closingElement, [\n          ...path.node.children, // Copy existing children\n          // Create a new li element containing our new entry\n          j.jsxElement(\n            j.jsxOpeningElement(j.jsxIdentifier('li')),\n            j.jsxClosingElement(j.jsxIdentifier('li')),\n            [j.stringLiteral('Venusaur')],\n          ),\n          j.jsxText('\\n'), // Add this to tidy up the formatting\n        ]),\n      ),\n    );\n\n  return source.toSource();\n}\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Input:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\n\nconst Button = () => {\n  return (\n    <ul>\n      <li>Bulbasaur</li>\n      <li>Ivysaur</li>\n    </ul>\n  );\n};\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Output:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-diff"},"import React from 'react';\n\nconst Button = () => {\n  return (\n    <ul>\n      <li>Bulbasaur</li>\n      <li>Ivysaur</li>\n+     <li>Venusaur</li>\n    </ul>\n  );\n};\n")),(0,o.yg)("h3",{id:"render-props"},"Render props"),(0,o.yg)("p",null,"Moving between different types of React composition strategies, like for example, from component props to ",(0,o.yg)("a",{parentName:"p",href:"https://reactjs.org/docs/render-props.html#using-props-other-than-render"},"render props")," is could be something you want to do between major versions.\nThis might seem difficult on the surface, but think about it like every other codemod. First we need to find the component, replace it with a modified copy of itself and finally insert a function as children."),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Transform:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-javascript"},"import { getJSXAttributes } from '@hypermod/utils';\n\nexport default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  source.findJSXElements('Avatar').forEach(element => {\n    // Find props all JSXAttributes with a prop called \"component\"\n    // (Using the getJSXAttributeByName util here for simplicity)\n    const componentProp = getJSXAttributes(j, element, 'component').get();\n    // Grabs the name of the component passed into the \"component\" prop\n    const componentName = j(componentProp)\n      .find(j.JSXExpressionContainer)\n      .find(j.Expression)\n      .get().value.name;\n\n    // Remove it since it's no longer required on the wrapping component\n    j(componentProp).remove();\n\n    // Create a new child component based on the component prop and spread props onto it\n    const customComponent = j.jsxElement(\n      j.jsxOpeningElement(\n        j.jsxIdentifier(componentName),\n        [j.jsxSpreadAttribute(j.identifier('props'))],\n        true,\n      ),\n    );\n\n    /**\n     * Here's where it gets interesting.\n     * We create a render prop function and pass in `customComponent` as the return value\n     */\n    const childrenExpression = j.jsxExpressionContainer(\n      j.arrowFunctionExpression([j.identifier('props')], customComponent),\n    );\n\n    /**\n     * Then finally, we replace our original component with the following.\n     * Taking properties from the original component and combining them with our new render prop function\n     */\n    j(element).replaceWith(\n      j.jsxElement(\n        j.jsxOpeningElement(\n          element.value.openingElement.name,\n          element.value.openingElement.attributes,\n          false,\n        ),\n        j.jsxClosingElement(element.value.openingElement.name),\n        [childrenExpression],\n      ),\n    );\n  });\n\n  return source.toSource();\n}\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Input:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-jsx"},"import Avatar from '@component-lib/avatar';\n\nconst App = () => {\n  return <Avatar name=\"Dan\" component={CustomAvatar} />;\n};\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Output:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-diff"},'\nimport Avatar from \'@component-lib/avatar\';\n\nconst App = () => {\n  return (\n-    <Avatar name="Dan" component={CustomAvatar} />\n+    <Avatar name="Dan">{props => <CustomAvatar {...props} />}</Avatar>\n+  );\n}\n')))}d.isMDXComponent=!0}}]);