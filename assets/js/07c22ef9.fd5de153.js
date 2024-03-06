"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[9951],{5680:(e,t,a)=>{a.d(t,{xA:()=>d,yg:()=>h});var n=a(6540);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},d=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=c(a),y=o,h=p["".concat(l,".").concat(y)]||p[y]||u[y]||r;return a?n.createElement(h,s(s({ref:t},d),{},{components:a})):n.createElement(h,s({ref:t},d))}));function h(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,s=new Array(r);s[0]=y;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:o,s[1]=i;for(var c=2;c<r;c++)s[c]=a[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}y.displayName="MDXCreateElement"},4408:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>c});var n=a(8168),o=(a(6540),a(5680));const r={id:"understanding-asts",title:"Understanding ASTs",slug:"/understanding-asts",description:"Learn about abstract syntax trees (ASTs) and how they are used in codemods. This page covers the basics of ASTs, including what they are and how they are used to represent the structure of code. We'll also discuss how to read and manipulate ASTs in your codemods to automatically refactor your codebase.",keywords:["abstract syntax trees","ASTs","codemods","refactor","codebase"]},s=void 0,i={unversionedId:"guides/understanding-asts",id:"guides/understanding-asts",title:"Understanding ASTs",description:"Learn about abstract syntax trees (ASTs) and how they are used in codemods. This page covers the basics of ASTs, including what they are and how they are used to represent the structure of code. We'll also discuss how to read and manipulate ASTs in your codemods to automatically refactor your codebase.",source:"@site/docs/guides/understanding-asts.mdx",sourceDirName:"guides",slug:"/understanding-asts",permalink:"/docs/understanding-asts",draft:!1,editUrl:"https://github.com/hypermod-io/hypermod-community/edit/main/website/docs/guides/understanding-asts.mdx",tags:[],version:"current",frontMatter:{id:"understanding-asts",title:"Understanding ASTs",slug:"/understanding-asts",description:"Learn about abstract syntax trees (ASTs) and how they are used in codemods. This page covers the basics of ASTs, including what they are and how they are used to represent the structure of code. We'll also discuss how to read and manipulate ASTs in your codemods to automatically refactor your codebase.",keywords:["abstract syntax trees","ASTs","codemods","refactor","codebase"]},sidebar:"docs",previous:{title:"Your first codemod",permalink:"/docs/your-first-codemod"},next:{title:"When not to codemod",permalink:"/docs/when-not-to-codemod"}},l={},c=[{value:"Abstract Syntax Tree (aka AST)",id:"abstract-syntax-tree-aka-ast",level:2},{value:"AST Explorer",id:"ast-explorer",level:2}],d={toc:c},p="wrapper";function u(e){let{components:t,...r}=e;return(0,o.yg)(p,(0,n.A)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"Before writing your first codemod, it\u2019s important to first have a good conceptual understanding of ASTs (abstract syntax trees) and how to work with them."),(0,o.yg)("h2",{id:"abstract-syntax-tree-aka-ast"},"Abstract Syntax Tree (aka AST)"),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"An abstract syntax tree (AST), is a tree representation of the abstract syntactic structure of source code written in a programming language. Each node of the tree denotes a construct occurring in the source code.")),(0,o.yg)("p",null,"\u2013 ",(0,o.yg)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Abstract_syntax_tree"},"Wiki: Abstract syntax tree")),(0,o.yg)("p",null,"Abstract Syntax Trees can be thought of as simply the object representation of your code after being parsed.\nYou might already be familiar with the tools and libraries that do this, for example ",(0,o.yg)("a",{parentName:"p",href:"https://babeljs.io/"},"babeljs"),", ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/benjamn/recast"},"recast"),", ",(0,o.yg)("a",{parentName:"p",href:"https://eslint.org/"},"eslint"),' etc.\nThese tools parse files into ASTs in preparation for some work, which generally consists of breaking a raw file down into "Nodes" which are then organized and categorized into a hierarchial format that can be reasoned about, manipulated and output back into a file.'),(0,o.yg)("p",null,(0,o.yg)("img",{alt:"Code \u2014 AST \u2014 AST(mutated) \u2014 Code",src:a(1385).A,width:"4000",height:"950"})),(0,o.yg)("p",null,"\u2013 ",(0,o.yg)("a",{parentName:"p",href:"https://itnext.io/automatic-refactoring-with-jscodeshift-codemods-45c219eaf992"},"Image source")),(0,o.yg)("p",null,"Not all ASTs are the same, different libraries like babel and recast structure their ASTs differently, but if you're comfortable with one it's not too hard to wrap your head around another."),(0,o.yg)("p",null,"For instance, consider this snippet:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-jsx"},"console.log('Hello, World');\n")),(0,o.yg)("p",null,"The way you might categorise the anatomy of this expression in your mind is probably not too dissimilar to how it's actually done in ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/benjamn/recast"},"recast")," (which is what is used in this project).\nSo now compare it to the actual resulting AST, generated by recast."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-js"},"const AST = {\n  type: 'File',\n  program: {\n    type: 'Program',\n    sourceType: 'module',\n    body: [\n      {\n        type: 'ExpressionStatement',\n        expression: {\n          type: 'CallExpression',\n          callee: {\n            type: 'MemberExpression',\n            object: {\n              type: 'Identifier',\n              name: 'console',\n            },\n            computed: false,\n            property: {\n              type: 'Identifier',\n              name: 'log',\n            },\n          },\n          arguments: [\n            {\n              type: 'StringLiteral',\n              extra: {\n                rawValue: 'Hello, World',\n                raw: \"'Hello, World'\",\n              },\n              value: 'Hello, World',\n            },\n          ],\n        },\n      },\n    ],\n  },\n};\n")),(0,o.yg)("p",null,"Now your initial reaction might be \"wow that's a lot for a simple console.log\" and that's a totally fair assessment. But look a little closer and you should start to see some order among the chaos.\nEvery ",(0,o.yg)("a",{parentName:"p",href:"/docs/glossary#node"},"Node"),' in this tree is given a "type", these types are key to how you navigate and interact with this object.'),(0,o.yg)("p",null,"So for example, if you want to know the arguments this method contains, you could first look at the ",(0,o.yg)("inlineCode",{parentName:"p"},"arguments")," property on the ",(0,o.yg)("inlineCode",{parentName:"p"},"ExpressionStatement"),".\nArguments in functions can be conceptually thought of as arrays, so it's no surprise that we're presented with an array here.\nNow we can see that in our array we have one element, which is of the type ",(0,o.yg)("inlineCode",{parentName:"p"},"StringLiteral")," and has its own metadata attached to it containing the value we're looking for: ",(0,o.yg)("inlineCode",{parentName:"p"},"Hello, World")," \u2013 Hooray \ud83c\udf89."),(0,o.yg)("p",null,"Great but where do we go from here? Well it totally depends on what you're trying to achieve.\nIf you want to replace the message that's logged, all you'd have to do is replace the ",(0,o.yg)("inlineCode",{parentName:"p"},"StringLiteral")," node with one containing the appropriate message.\nIf you want to pass an additional argument to the method, you could simply push a new node into the arguments array and so on."),(0,o.yg)("p",null,"The point is, with this abstract data structure we can inspect and manipulate it into any shape we want! A perfect tool for us codemoders!"),(0,o.yg)("h2",{id:"ast-explorer"},"AST Explorer"),(0,o.yg)("p",null,"ASTs, like in the example above, can get quite large, so you could imagine how big one for a typical javascript source file could get \ud83d\ude31!\nHow can one make sense of it all? Well luckily there are indispensable tools out there to help..."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"https://astexplorer.net/"},"astexplorer.net")," is one of those tools."),(0,o.yg)("p",null,(0,o.yg)("img",{alt:"AST Explorer screenshot",src:a(584).A,width:"3688",height:"2228"})),(0,o.yg)("p",null,"It provides a real-time representation of your code as an AST which is inspectable and lets you write and test transforms against it live in the browser.\nIt also supports other ASTs like babel, typescript etc. so for our use-case we'll need to configure it a bit to support recast + jscodeshift."),(0,o.yg)("p",null,"To configure it, follow these steps:"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"Set language to Javascript"),(0,o.yg)("li",{parentName:"ol"},"Set the transformer to ",(0,o.yg)("inlineCode",{parentName:"li"},"recast")),(0,o.yg)("li",{parentName:"ol"},"If you want to enable typescript support, click the little cog icon and set the parser to ",(0,o.yg)("inlineCode",{parentName:"li"},"TypeScript")),(0,o.yg)("li",{parentName:"ol"},'And finally turn the "transform" toggle on, this should show some new panels to write and test your transforms.')),(0,o.yg)("p",null,"And there you go, you're all setup with a sandbox to help you test/learn/experiment with!\nFrom here you should have enough of a grasp of ASTs to try your hand at ",(0,o.yg)("a",{parentName:"p",href:"/docs/your-first-codemod"},"writing your first codemod"),"."))}u.isMDXComponent=!0},1385:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/ast-f6b2404fe976ce54f4d4d5e9e29007cb.png"},584:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/astexplorer-845e0c64d8ddc8aed2cfe5b5900e69e8.png"}}]);