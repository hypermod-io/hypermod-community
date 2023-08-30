"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[611],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=o.createContext({}),u=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=u(e.components);return o.createElement(s.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=u(n),m=r,f=d["".concat(s,".").concat(m)]||d[m]||c[m]||i;return n?o.createElement(f,a(a({ref:t},p),{},{components:n})):o.createElement(f,a({ref:t},p))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:r,a[1]=l;for(var u=2;u<i;u++)a[u]=n[u];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7615:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return a},default:function(){return c},frontMatter:function(){return i},metadata:function(){return l},toc:function(){return u}});var o=n(3117),r=(n(7294),n(3905));const i={id:"your-first-codemod",title:"Your first codemod",slug:"/your-first-codemod"},a=void 0,l={unversionedId:"guides/your-first-codemod",id:"guides/your-first-codemod",title:"Your first codemod",description:"Every codemod follows the same series of operations: find, modify/insert, remove and finally output.",source:"@site/docs/guides/your-first-codemod.mdx",sourceDirName:"guides",slug:"/your-first-codemod",permalink:"/docs/your-first-codemod",draft:!1,editUrl:"https://github.com/hypermod-io/hypermod-community/edit/main/website/docs/guides/your-first-codemod.mdx",tags:[],version:"current",frontMatter:{id:"your-first-codemod",title:"Your first codemod",slug:"/your-first-codemod"},sidebar:"docs",previous:{title:"External Packages",permalink:"/docs/external-packages"},next:{title:"Understanding ASTs",permalink:"/docs/understanding-asts"}},s={},u=[{value:"Setup",id:"setup",level:2},{value:"Find",id:"find",level:2},{value:"Modify &amp; Insert",id:"modify--insert",level:2},{value:"Remove",id:"remove",level:2},{value:"Output",id:"output",level:2}],p={toc:u},d="wrapper";function c(e){let{components:t,...n}=e;return(0,r.kt)(d,(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Every codemod follows the same series of operations: find, modify/insert, remove and finally output.\nThat's it. Once you know how to handle all of these operations you can do anything within a codemod."),(0,r.kt)("h2",{id:"setup"},"Setup"),(0,r.kt)("p",null,'Firstly you\'ll need to create a new file which defines a "transform" function. A transform is simply a javascript function which serves as the entry-point for your codemod.'),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"export default function transform(file, { jscodeshift: j }, options) {\n  //... codemod goes here\n}\n")),(0,r.kt)("h2",{id:"find"},"Find"),(0,r.kt)("p",null,"When trying to locate specific nodes in your AST, it helps to think about it like finding DOM nodes with jQuery.\nEvery node has a ",(0,r.kt)("inlineCode",{parentName:"p"},"type")," and in most cases it's as simple a 'finding' all of the nodes in your AST that match that type, then filtering by an attribute of that node to determine if it's the one you're looking for."),(0,r.kt)("p",null,"Given this file, let's try and locate a ",(0,r.kt)("inlineCode",{parentName:"p"},"ImportDeclaration")," with the source ",(0,r.kt)("inlineCode",{parentName:"p"},"my-module"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { foo, bar } from 'my-module'; // We're looking for this one\nimport { cheese, burger } from 'not-my-module'; // Not this one\n")),(0,r.kt)("p",null,"Our transform will look something like this."),(0,r.kt)("p",null,"(1) First we'll create an AST, (2) second we'll look at all nodes and return only nodes that match the ",(0,r.kt)("inlineCode",{parentName:"p"},"ImportDeclaration")," and then (3) we'll filter all imports by their source values."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"export default function transform(file, { jscodeshift: j }, options) {\n  const source = j(file.source); // (1) Create an AST of the given file\n\n  const imports = source\n    .find(j.ImportDeclaration) // (2) Find all import declarations!\n    .filter(path => path.node.source.value === 'my-module'); // (3) Get only imports that have a source that matches what I'm looking for\n\n  console.log(imports); // Log our found node!\n\n  return source.toSource(options.printOptions); // We return the modified file\n}\n")),(0,r.kt)("p",null,"If you prefer a more declarative approach, you can provide a second argument to ",(0,r.kt)("inlineCode",{parentName:"p"},"find")," describing the expected shape of the node you are looking for."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"const imports = source.find(j.ImportDeclaration, {\n  source: { value: 'my-module' },\n}); // Find all import declarations that match this shape\n")),(0,r.kt)("p",null,"This behaves like a fuzzy searcher: The more details provided the more narrow the search is."),(0,r.kt)("h2",{id:"modify--insert"},"Modify & Insert"),(0,r.kt)("p",null,"Now let's say that we want to pull in a new import from 'my-module' called ",(0,r.kt)("inlineCode",{parentName:"p"},"baz"),". Luckily you've already written a majority of the code above.\nAll we'll need to do now is \"insert\" an new ",(0,r.kt)("inlineCode",{parentName:"p"},"ImportSpecifier")," into the ",(0,r.kt)("inlineCode",{parentName:"p"},"ImportDeclaration")," node that we've just retrieved."),(0,r.kt)("p",null,"Now inserting can look a little awkward at first, because what we're really doing is building a new node based on what we've found and replacing it with a modified version of itself."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"export default function transform(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  const imports = source\n    .find(j.ImportDeclaration)\n    .filter(path => path.node.source.value === 'my-module');\n\n  const myNewImportSpecifier = j.importSpecifier(j.identifier('baz')); // (1) Build a new import specifier called \"baz\"\n\n  imports.array.forEach(moduleImport => {\n    // (4) Replace the node we found earlier with its modified counterpart\n    moduleImport.replaceWith(\n      // (2) Build a new import declaration based on the old one we found\n      j.importDeclaration(\n        [...moduleImport.node.specifiers, myNewImportSpecifier], // (3) Insert our new import specificer\n        reactImport.node.source, // Copy across other relevant attributes unchanged\n      ),\n    );\n  });\n\n  return source.toSource(options.printOptions);\n}\n")),(0,r.kt)("p",null,"Now there are a few moving pieces in this example, let's step through them:"),(0,r.kt)("p",null,'(1) Here we "build" a new node of type ',(0,r.kt)("inlineCode",{parentName:"p"},"ImportSpecifier"),"."),(0,r.kt)("p",null,"You can build a node by using the camelCase variant method of its node type.\nSo to build an ",(0,r.kt)("inlineCode",{parentName:"p"},"ImportSpecifier")," you use ",(0,r.kt)("inlineCode",{parentName:"p"},"j.importSpecifier(...)")," and when you want to search for one, you use the CapitalCase variant ",(0,r.kt)("inlineCode",{parentName:"p"},"j.ImportSpecifier"),"."),(0,r.kt)("p",null,"(2) Create a new import declaration"),(0,r.kt)("p",null,"Similar to (1), we build a new import declaration. We do this because in jscodeshift there's no way to mutate attributes of a node, instead we must use the ",(0,r.kt)("inlineCode",{parentName:"p"},"replaceWith()")," method.\nSo we create a new node, taking attributes from the old one and making modifications where necessary."),(0,r.kt)("p",null,"(3) Insert our new import specifier"),(0,r.kt)("p",null,"Here we push our new import specifier into the array of existing specifiers."),(0,r.kt)("p",null,"(4) Replace the node"),(0,r.kt)("p",null,"Finally we replace our ",(0,r.kt)("inlineCode",{parentName:"p"},"ImportDeclaration")," with our new one and the resulting output should look like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff"},"-import { foo, bar } from 'my-module';\n+import { foo, bar, baz } from 'my-module';\nimport { cheese, burger } from 'not-my-module';\n")),(0,r.kt)("h2",{id:"remove"},"Remove"),(0,r.kt)("p",null,"When removing a node, it's usually as simple as finding the node and calling ",(0,r.kt)("inlineCode",{parentName:"p"},".remove()")," on it."),(0,r.kt)("p",null,"So given this file, let's say that we're trying to remove the ",(0,r.kt)("inlineCode",{parentName:"p"},"isDisabled")," prop on the ",(0,r.kt)("inlineCode",{parentName:"p"},"Button")," component."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\nimport { Button, InputField } from 'ui-lib';\n\nexport const App = props => {\n  return (\n    <>\n      <InputField value=\"Hello\" isDisabled />\n      <Button isDisabled>Submit</Button>\n    </>\n  );\n};\n")),(0,r.kt)("p",null,'We\'ll need to (1) find all JSX props, (2) filter only props called "isDisabled", (3) finally, call ',(0,r.kt)("inlineCode",{parentName:"p"},"remove()")," to delete them from the AST."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"export default function transform(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  source\n    .find(j.JSXAttribute) // (1) Find all JSX props\n    .filter(path => path.node.name.name === 'isDisabled') // (2) Filter by name `isDisabled`\n    .remove(); // (3) We remove any `isDisabled` prop from the AST\n\n  return source.toSource(options.printOptions);\n}\n")),(0,r.kt)("p",null,"The result of this change will leave our file looking like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff"},"import React from 'react';\nimport { Button, InputField } from 'ui-lib';\n\nexport const App = props => {\n  return (\n    <>\n-      <InputField value=\"Hello\" isDisabled />\n+      <InputField value=\"Hello\" />\n-      <Button isDisabled>Submit</Button>\n+      <Button>Submit</Button>\n    </>\n  );\n};\n")),(0,r.kt)("p",null,"Now the important thing to note here is that both ",(0,r.kt)("inlineCode",{parentName:"p"},"Button")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"InputField")," components lost the ",(0,r.kt)("inlineCode",{parentName:"p"},"isDisabled")," prop.\nThat's because we haven't filtered by component name first. Let's fix that now."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff"},"export default function transform(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  source\n+   .find(j.JSXElement)\n+   .filter(path => path.value.openingElement.name.name === 'Button')\n    .find(j.JSXAttribute) // (1) Find all JSX props\n    .filter(path => path.node.name.name === 'isDisabled') // (2) Filter by name `isDisabled`\n    .remove(); // (3) We remove any `isDisabled` prop from the AST\n\n  return source.toSource(options.printOptions);\n}\n")),(0,r.kt)("p",null,"and finally our output file will look as expected!"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff"},"import React from 'react';\nimport { Button, InputField } from 'ui-lib';\n\nexport const App = props => {\n  return (\n    <>\n      <InputField value=\"Hello\" isDisabled />\n-     <Button isDisabled>Submit</Button>\n+     <Button>Submit</Button>\n    </>\n  );\n};\n")),(0,r.kt)("h2",{id:"output"},"Output"),(0,r.kt)("p",null,"At the end of every transform, you'll need to call and return your modified AST. This is usually done via the ",(0,r.kt)("inlineCode",{parentName:"p"},"toSource()")," method.\nWhen this function is called ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/benjamn/recast/"},"Recast")," will take your AST, turn it back into code, format it and output it to the source file.\nThe result of which will include all of the modifications you made."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"export default function transform(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  // ...\n\n  return source.toSource(options.printOptions); // Output your file here\n}\n")),(0,r.kt)("p",null,"This method, accepts some ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/benjamn/recast/blob/52a7ec3eaaa37e78436841ed8afc948033a86252/lib/options.js#L61"},"options for formatting"),".\njscodeshift uses ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/benjamn/recast/"},"Recast")," under the hood, which tries its best to format output code as close to the original file as possible. But it's often good to run your formatter of choice after running the codemod to be completely sure."),(0,r.kt)("p",null,"To avoid formatting issues and to speed up running transforms across large codebases, it's good practice to only modify the files you need to. For example, in cases where the code you want to change does not exist in the file you're attempting to transform, you should bail early and return the \"raw\" source file."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"export default function transform(file, { jscodeshift: j }, options) {\n  const hasIsDisabledProp = !!source\n    .find(j.JSXAttribute)\n    .filter(path.node.name.name === 'isDisabled')\n    .length\n\n  if (!hasIsDisabledProp) {\n    return file.source; // Returns original source file, untouched and unformatted\n  }\n\n  // transform code goes here...\n\n  return source.toSource(options.printOptions);\n")))}c.isMDXComponent=!0}}]);