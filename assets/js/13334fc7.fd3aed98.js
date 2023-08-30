"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[4894],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),m=s(n),f=o,d=m["".concat(c,".").concat(f)]||m[f]||u[f]||a;return n?r.createElement(d,i(i({ref:t},l),{},{components:n})):r.createElement(d,i({ref:t},l))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=f;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p[m]="string"==typeof e?e:o,i[1]=p;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},6430:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return i},default:function(){return u},frontMatter:function(){return a},metadata:function(){return p},toc:function(){return s}});var r=n(3117),o=(n(7294),n(3905));const a={id:"import-manipulation",title:"Import manipulation",slug:"/import-manipulation",description:"Learn how to use codemods to make effective and efficient changes to import statements. This guide covers updating the location of imported code, and modifying import structures.",keywords:["typescript","codemod","codemorph","jscodeshift"]},i=void 0,p={unversionedId:"recipes/import-manipulation",id:"recipes/import-manipulation",title:"Import manipulation",description:"Learn how to use codemods to make effective and efficient changes to import statements. This guide covers updating the location of imported code, and modifying import structures.",source:"@site/docs/recipes/import-manipulation.mdx",sourceDirName:"recipes",slug:"/import-manipulation",permalink:"/docs/import-manipulation",draft:!1,editUrl:"https://github.com/hypermod-io/hypermod-community/edit/main/website/docs/recipes/import-manipulation.mdx",tags:[],version:"current",frontMatter:{id:"import-manipulation",title:"Import manipulation",slug:"/import-manipulation",description:"Learn how to use codemods to make effective and efficient changes to import statements. This guide covers updating the location of imported code, and modifying import structures.",keywords:["typescript","codemod","codemorph","jscodeshift"]},sidebar:"docs",previous:{title:"Integrating with monorepos",permalink:"/docs/monorepos"},next:{title:"React & JSX",permalink:"/docs/react"}},c={},s=[{value:"Import declarations",id:"import-declarations",level:2},{value:"Finding an import declaration",id:"finding-an-import-declaration",level:3},{value:"Inserting an import declaration",id:"inserting-an-import-declaration",level:3},{value:"Inserting an import declaration before/after a node",id:"inserting-an-import-declaration-beforeafter-a-node",level:3},{value:"Removing an import declaration",id:"removing-an-import-declaration",level:3},{value:"Replace/Rename an import declaration",id:"replacerename-an-import-declaration",level:3},{value:"Import specifiers",id:"import-specifiers",level:2},{value:"Finding an import specifiers",id:"finding-an-import-specifiers",level:3},{value:"Inserting an import specifier",id:"inserting-an-import-specifier",level:3},{value:"Inserting an aliased (as) import specifier",id:"inserting-an-aliased-as-import-specifier",level:3},{value:"Removing an import specifier",id:"removing-an-import-specifier",level:3},{value:"Replace/Rename an import specifier",id:"replacerename-an-import-specifier",level:3}],l={toc:s},m="wrapper";function u(e){let{components:t,...n}=e;return(0,o.kt)(m,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Modifying imports is one of the first and most common operations you are likely to do when writing codemods."),(0,o.kt)("p",null,"In this guide, we will explore how codemods can be used to make effective and efficient changes to javascript import statements.\nFrom changing import names to updating the location of imported code, and improving overall import structure.\nBy following the steps outlined in this guide, you'll be able to maintain a well-organized,\nconsistent codebase and unlock the many benefits that come with using codemods."),(0,o.kt)("h2",{id:"import-declarations"},"Import declarations"),(0,o.kt)("p",null,"An ",(0,o.kt)("inlineCode",{parentName:"p"},"ImportDeclaration")," refers to an entire import statement for example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import React, { useEffect } from 'react';\n")),(0,o.kt)("p",null,"The anatomy of an ",(0,o.kt)("inlineCode",{parentName:"p"},"ImportDeclaration")," includes:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"An array of ",(0,o.kt)("inlineCode",{parentName:"li"},"specifiers"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"ImportDefaultSpecifier"),": ",(0,o.kt)("inlineCode",{parentName:"li"},"React")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"ImportSpecifier"),": ",(0,o.kt)("inlineCode",{parentName:"li"},"useEffect")))),(0,o.kt)("li",{parentName:"ul"},"A ",(0,o.kt)("inlineCode",{parentName:"li"},"source")," which can either be a module name or path: ",(0,o.kt)("inlineCode",{parentName:"li"},"react"))),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Note: ",(0,o.kt)("inlineCode",{parentName:"strong"},"@hypermod/utils")," provides utilities for import manipulation, please see the docs")),(0,o.kt)("h3",{id:"finding-an-import-declaration"},"Finding an import declaration"),(0,o.kt)("p",null,"Import declarations can be found with the ",(0,o.kt)("inlineCode",{parentName:"p"},"jscodeshift.ImportDeclaration")," type."),(0,o.kt)("p",null,"In this example we're seaching this file for the ",(0,o.kt)("inlineCode",{parentName:"p"},"React")," import."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Transform:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  const reactImportDeclaration = source\n    .find(j.ImportDeclaration) // Find all nodes that match a type of `ImportDeclaration`\n    .filter(path => path.node.source.value === 'react'); // Filter imports by source equal to the target ie \"react\"\n\n  // Do something here\n  console.log(reactImportDeclaration);\n\n  return source.toSource();\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Input:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Output (unchanged):")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("h3",{id:"inserting-an-import-declaration"},"Inserting an import declaration"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Transform:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  // Build a new import\n  const newImport = j.importDeclaration(\n    [j.importDefaultSpecifier(j.identifier('Foo'))],\n    j.stringLiteral('bar'),\n  );\n\n  // Insert it at the top of the document\n  source.get().node.program.body.unshift(newImport);\n\n  return source.toSource();\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Input:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Output:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-diff"},"+import Foo from 'bar';\nimport React from 'react';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("h3",{id:"inserting-an-import-declaration-beforeafter-a-node"},"Inserting an import declaration before/after a node"),(0,o.kt)("p",null,"Sometimes you might want to insert an import before another import.\nFor that you can use ",(0,o.kt)("inlineCode",{parentName:"p"},"insertBefore"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"insertAfter")," methods."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Transform:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  // Build a new import\n  const newImport = j.importDeclaration(\n    [j.importDefaultSpecifier(j.identifier('Foo'))],\n    j.stringLiteral('bar'),\n  );\n\n  const reactImportDeclaration = source\n    .find(j.ImportDeclaration)\n    .filter(path => path.node.source.value === 'react')\n    .insertAfter(newImport); // Insert the new import after all react imports\n\n  return source.toSource();\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Input:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Output:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-diff"},"import React from 'react';\n+import Foo from 'bar';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("h3",{id:"removing-an-import-declaration"},"Removing an import declaration"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Transform:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  source\n    .find(j.ImportDeclaration) // Find all nodes that match a type of `ImportDeclaration`\n    .filter(path => path.node.source.value === 'react') // Filter imports by source equal to the target ie \"react\"\n    .remove(); // Removes all found import declarations\n\n  return source.toSource();\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Input:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Output:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-diff"},"-import React from 'react';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("h3",{id:"replacerename-an-import-declaration"},"Replace/Rename an import declaration"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Transform:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  const reactImports = source\n    .find(j.ImportDeclaration) // Find all nodes that match a type of `ImportDeclaration`\n    .filter(path => path.node.source.value === 'react'); // Filter imports by source equal to the target ie \"react\"\n\n  reactImports.forEach(\n    (\n      reactImport, // Iterate over react imports\n    ) =>\n      // Replace the existing node with a new one\n      j(reactImport).replaceWith(\n        // Build a new import declaration node based on the existing one\n        j.importDeclaration(\n          reactImport.node.specifiers, // copy over the existing import specificers\n          j.stringLiteral('hot-new-library'), // Replace the source with our new source\n        ),\n      ),\n  );\n\n  return source.toSource();\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Input:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Output:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-diff"},"-import React from 'react';\n+import React from 'hot-new-library';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("h2",{id:"import-specifiers"},"Import specifiers"),(0,o.kt)("p",null,"Import specifiers are the actual variables and functions being imported"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import React, { useEffect } from 'react';\n")),(0,o.kt)("p",null,"Generally, within an import declaration import specifiers are defined as an array of either ",(0,o.kt)("inlineCode",{parentName:"p"},"ImportSpecifier")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"ImportDefaultSpecifier"),"."),(0,o.kt)("p",null,"So in the above case import specifiers are ",(0,o.kt)("inlineCode",{parentName:"p"},"React")," & ",(0,o.kt)("inlineCode",{parentName:"p"},"useEffect"),"."),(0,o.kt)("h3",{id:"finding-an-import-specifiers"},"Finding an import specifiers"),(0,o.kt)("p",null,"Finding an import is the same as finding any other node."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Transform:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  // Finding all react import declarations\n  const reactImports = source\n    .find(j.ImportDeclaration)\n    .filter(path => path.node.source.value === 'react');\n\n  // Here we narrow our search to only relevant import nodes\n  const useEffectSpecifier = reactImports\n    .find(j.ImportSpecifier)\n    .filter(path => path.node.imported.name === 'useEffect'); // Filter by name \"useEffect\"\n\n  // Do something here\n  console.log(useEffectSpecifier);\n\n  return source.toSource();\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Input:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Output (unchanged):")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("h3",{id:"inserting-an-import-specifier"},"Inserting an import specifier"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Transform:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  // Finding all react import declarations\n  const reactImports = source\n    .find(j.ImportDeclaration)\n    .filter(path => path.node.source.value === 'react');\n\n  // Build our new import specifier\n  const importSpecifier = j.importSpecifier(j.identifier('useContext'));\n\n  // Iterate over react imports\n  reactImports.forEach(reactImport =>\n    // Replace the existing node with a new one\n    j(reactImport).replaceWith(\n      // Build a new import declaration node based on the existing one\n      j.importDeclaration(\n        [...reactImport.node.specifiers, importSpecifier], // Insert our new import specificer\n        reactImport.node.source,\n      ),\n    ),\n  );\n\n  return source.toSource();\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Input:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Output:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-diff"},"+import React, { useEffect, useContext } from 'react';\n-import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("h3",{id:"inserting-an-aliased-as-import-specifier"},"Inserting an aliased (as) import specifier"),(0,o.kt)("p",null,"Sometimes you might want to import something under an alias."),(0,o.kt)("p",null,"For example: ",(0,o.kt)("inlineCode",{parentName:"p"},"import { useEffect as useFoo } from 'react'"),"."),(0,o.kt)("p",null,"In this case, simply passing an identifier into the 'local' argument of ",(0,o.kt)("inlineCode",{parentName:"p"},"j.importSpecifier(imported, local)")," will do the trick."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"const importSpecifier = j.importSpecifier(\n  j.identifier('useContext'),\n  j.identifier('useFoo'),\n);\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Transform:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  const reactImports = source\n    .find(j.ImportDeclaration)\n    .filter(path => path.node.source.value === 'react');\n\n  // Build our new import specifier\n  const importSpecifier = j.importSpecifier(\n    j.identifier('useContext'),\n    j.identifier('useFoo'),\n  );\n\n  reactImports.forEach(reactImport =>\n    j(reactImport).replaceWith(\n      j.importDeclaration(\n        [...reactImport.node.specifiers, importSpecifier], // Insert our new import specificer\n        reactImport.node.source,\n      ),\n    ),\n  );\n\n  return source.toSource();\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Input:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Output:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-diff"},"+import React, { useEffect, useContext as useFoo } from 'react';\n-import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("h3",{id:"removing-an-import-specifier"},"Removing an import specifier"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Transform:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  source\n    .find(j.ImportDeclaration)\n    .filter(path => path.node.source.value === 'react')\n    .find(j.ImportSpecifier)\n    .filter(path => path.node.imported.name === 'useEffect')\n    .remove();\n\n  return source.toSource();\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Input:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Output:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-diff"},"+import React from 'react';\n-import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("h3",{id:"replacerename-an-import-specifier"},"Replace/Rename an import specifier"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Transform:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  // Build an import specifier\n  const newImport = j.importSpecifier(j.identifier('useFoo'));\n\n  source\n    .find(j.ImportDeclaration)\n    .filter(path => path.node.source.value === 'react')\n    .find(j.ImportSpecifier)\n    .filter(path => path.node.imported.name === 'useEffect')\n    .replaceWith(newImport); // Insert our new import specifier\n\n  return source.toSource();\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Input:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Output:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-diff"},"+import React, { useFoo } from 'react';\n-import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n")))}u.isMDXComponent=!0}}]);