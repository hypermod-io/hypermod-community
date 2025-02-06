"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[7897],{2416:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>c,toc:()=>p});var t=r(4848),o=r(8453);const i={id:"import-manipulation",title:"Import manipulation",slug:"/import-manipulation",description:"Learn how to use codemods to make effective and efficient changes to import statements. This guide covers updating the location of imported code, and modifying import structures.",keywords:["typescript","codemod","codemorph","jscodeshift"]},s=void 0,c={id:"recipes/import-manipulation",title:"Import manipulation",description:"Learn how to use codemods to make effective and efficient changes to import statements. This guide covers updating the location of imported code, and modifying import structures.",source:"@site/docs/recipes/import-manipulation.mdx",sourceDirName:"recipes",slug:"/import-manipulation",permalink:"/hypermod-community/docs/import-manipulation",draft:!1,unlisted:!1,editUrl:"https://github.com/hypermod-io/hypermod-community/edit/main/website/docs/recipes/import-manipulation.mdx",tags:[],version:"current",frontMatter:{id:"import-manipulation",title:"Import manipulation",slug:"/import-manipulation",description:"Learn how to use codemods to make effective and efficient changes to import statements. This guide covers updating the location of imported code, and modifying import structures.",keywords:["typescript","codemod","codemorph","jscodeshift"]},sidebar:"docs",previous:{title:"Integrating with monorepos",permalink:"/hypermod-community/docs/monorepos"},next:{title:"React & JSX",permalink:"/hypermod-community/docs/react"}},a={},p=[{value:"Import declarations",id:"import-declarations",level:2},{value:"Finding an import declaration",id:"finding-an-import-declaration",level:3},{value:"Inserting an import declaration",id:"inserting-an-import-declaration",level:3},{value:"Inserting an import declaration before/after a node",id:"inserting-an-import-declaration-beforeafter-a-node",level:3},{value:"Removing an import declaration",id:"removing-an-import-declaration",level:3},{value:"Replace/Rename an import declaration",id:"replacerename-an-import-declaration",level:3},{value:"Import specifiers",id:"import-specifiers",level:2},{value:"Finding an import specifiers",id:"finding-an-import-specifiers",level:3},{value:"Inserting an import specifier",id:"inserting-an-import-specifier",level:3},{value:"Inserting an aliased (as) import specifier",id:"inserting-an-aliased-as-import-specifier",level:3},{value:"Removing an import specifier",id:"removing-an-import-specifier",level:3},{value:"Replace/Rename an import specifier",id:"replacerename-an-import-specifier",level:3}];function l(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components},{Head:r}=n;return r||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(r,{children:[(0,t.jsx)("title",{children:"Import manipulation"}),(0,t.jsx)("link",{rel:"canonical",href:"https://hypermod.io/docs/guides/import-manipulation"})]}),"\n",(0,t.jsx)(n.admonition,{type:"info",children:(0,t.jsxs)(n.p,{children:["This guide has been moved to a new location. Please visit the new ",(0,t.jsx)(n.a,{href:"https://hypermod.io/docs/guides/import-manipulation",children:"Import manipulation"})," guide."]})}),"\n",(0,t.jsx)(n.p,{children:"Modifying imports is one of the first and most common operations you are likely to do when writing codemods."}),"\n",(0,t.jsx)(n.p,{children:"In this guide, we will explore how codemods can be used to make effective and efficient changes to javascript import statements.\nFrom changing import names to updating the location of imported code, and improving overall import structure.\nBy following the steps outlined in this guide, you'll be able to maintain a well-organized,\nconsistent codebase and unlock the many benefits that come with using codemods."}),"\n",(0,t.jsx)(n.h2,{id:"import-declarations",children:"Import declarations"}),"\n",(0,t.jsxs)(n.p,{children:["An ",(0,t.jsx)(n.code,{children:"ImportDeclaration"})," refers to an entire import statement for example:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",children:"import React, { useEffect } from 'react';\n"})}),"\n",(0,t.jsxs)(n.p,{children:["The anatomy of an ",(0,t.jsx)(n.code,{children:"ImportDeclaration"})," includes:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["An array of ",(0,t.jsx)(n.code,{children:"specifiers"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"ImportDefaultSpecifier"}),": ",(0,t.jsx)(n.code,{children:"React"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"ImportSpecifier"}),": ",(0,t.jsx)(n.code,{children:"useEffect"})]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["A ",(0,t.jsx)(n.code,{children:"source"})," which can either be a module name or path: ",(0,t.jsx)(n.code,{children:"react"})]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsxs)(n.strong,{children:["Note: ",(0,t.jsx)(n.code,{children:"@hypermod/utils"})," provides utilities for import manipulation, please see the docs"]})}),"\n",(0,t.jsx)(n.h3,{id:"finding-an-import-declaration",children:"Finding an import declaration"}),"\n",(0,t.jsxs)(n.p,{children:["Import declarations can be found with the ",(0,t.jsx)(n.code,{children:"jscodeshift.ImportDeclaration"})," type."]}),"\n",(0,t.jsxs)(n.p,{children:["In this example we're seaching this file for the ",(0,t.jsx)(n.code,{children:"React"})," import."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Transform:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",children:"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  const reactImportDeclaration = source\n    .find(j.ImportDeclaration) // Find all nodes that match a type of `ImportDeclaration`\n    .filter(path => path.node.source.value === 'react'); // Filter imports by source equal to the target ie \"react\"\n\n  // Do something here\n  console.log(reactImportDeclaration);\n\n  return source.toSource();\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Input:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import React from 'react';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Output (unchanged):"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import React from 'react';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.h3,{id:"inserting-an-import-declaration",children:"Inserting an import declaration"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Transform:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",children:"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  // Build a new import\n  const newImport = j.importDeclaration(\n    [j.importDefaultSpecifier(j.identifier('Foo'))],\n    j.stringLiteral('bar'),\n  );\n\n  // Insert it at the top of the document\n  source.get().node.program.body.unshift(newImport);\n\n  return source.toSource();\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Input:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import React from 'react';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Output:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:"+import Foo from 'bar';\nimport React from 'react';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.h3,{id:"inserting-an-import-declaration-beforeafter-a-node",children:"Inserting an import declaration before/after a node"}),"\n",(0,t.jsxs)(n.p,{children:["Sometimes you might want to insert an import before another import.\nFor that you can use ",(0,t.jsx)(n.code,{children:"insertBefore"}),", ",(0,t.jsx)(n.code,{children:"insertAfter"})," methods."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Transform:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",children:"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  // Build a new import\n  const newImport = j.importDeclaration(\n    [j.importDefaultSpecifier(j.identifier('Foo'))],\n    j.stringLiteral('bar'),\n  );\n\n  const reactImportDeclaration = source\n    .find(j.ImportDeclaration)\n    .filter(path => path.node.source.value === 'react')\n    .insertAfter(newImport); // Insert the new import after all react imports\n\n  return source.toSource();\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Input:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import React from 'react';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Output:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:"import React from 'react';\n+import Foo from 'bar';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.h3,{id:"removing-an-import-declaration",children:"Removing an import declaration"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Transform:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",children:"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  source\n    .find(j.ImportDeclaration) // Find all nodes that match a type of `ImportDeclaration`\n    .filter(path => path.node.source.value === 'react') // Filter imports by source equal to the target ie \"react\"\n    .remove(); // Removes all found import declarations\n\n  return source.toSource();\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Input:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import React from 'react';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Output:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:"-import React from 'react';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.h3,{id:"replacerename-an-import-declaration",children:"Replace/Rename an import declaration"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Transform:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",children:"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  const reactImports = source\n    .find(j.ImportDeclaration) // Find all nodes that match a type of `ImportDeclaration`\n    .filter(path => path.node.source.value === 'react'); // Filter imports by source equal to the target ie \"react\"\n\n  reactImports.forEach(\n    (\n      reactImport, // Iterate over react imports\n    ) =>\n      // Replace the existing node with a new one\n      j(reactImport).replaceWith(\n        // Build a new import declaration node based on the existing one\n        j.importDeclaration(\n          reactImport.node.specifiers, // copy over the existing import specificers\n          j.stringLiteral('hot-new-library'), // Replace the source with our new source\n        ),\n      ),\n  );\n\n  return source.toSource();\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Input:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import React from 'react';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Output:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:"-import React from 'react';\n+import React from 'hot-new-library';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.h2,{id:"import-specifiers",children:"Import specifiers"}),"\n",(0,t.jsx)(n.p,{children:"Import specifiers are the actual variables and functions being imported"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",children:"import React, { useEffect } from 'react';\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Generally, within an import declaration import specifiers are defined as an array of either ",(0,t.jsx)(n.code,{children:"ImportSpecifier"})," or ",(0,t.jsx)(n.code,{children:"ImportDefaultSpecifier"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["So in the above case import specifiers are ",(0,t.jsx)(n.code,{children:"React"})," & ",(0,t.jsx)(n.code,{children:"useEffect"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"finding-an-import-specifiers",children:"Finding an import specifiers"}),"\n",(0,t.jsx)(n.p,{children:"Finding an import is the same as finding any other node."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Transform:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",children:"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  // Finding all react import declarations\n  const reactImports = source\n    .find(j.ImportDeclaration)\n    .filter(path => path.node.source.value === 'react');\n\n  // Here we narrow our search to only relevant import nodes\n  const useEffectSpecifier = reactImports\n    .find(j.ImportSpecifier)\n    .filter(path => path.node.imported.name === 'useEffect'); // Filter by name \"useEffect\"\n\n  // Do something here\n  console.log(useEffectSpecifier);\n\n  return source.toSource();\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Input:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Output (unchanged):"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.h3,{id:"inserting-an-import-specifier",children:"Inserting an import specifier"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Transform:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",children:"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  // Finding all react import declarations\n  const reactImports = source\n    .find(j.ImportDeclaration)\n    .filter(path => path.node.source.value === 'react');\n\n  // Build our new import specifier\n  const importSpecifier = j.importSpecifier(j.identifier('useContext'));\n\n  // Iterate over react imports\n  reactImports.forEach(reactImport =>\n    // Replace the existing node with a new one\n    j(reactImport).replaceWith(\n      // Build a new import declaration node based on the existing one\n      j.importDeclaration(\n        [...reactImport.node.specifiers, importSpecifier], // Insert our new import specificer\n        reactImport.node.source,\n      ),\n    ),\n  );\n\n  return source.toSource();\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Input:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Output:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:"+import React, { useEffect, useContext } from 'react';\n-import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.h3,{id:"inserting-an-aliased-as-import-specifier",children:"Inserting an aliased (as) import specifier"}),"\n",(0,t.jsx)(n.p,{children:"Sometimes you might want to import something under an alias."}),"\n",(0,t.jsxs)(n.p,{children:["For example: ",(0,t.jsx)(n.code,{children:"import { useEffect as useFoo } from 'react'"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["In this case, simply passing an identifier into the 'local' argument of ",(0,t.jsx)(n.code,{children:"j.importSpecifier(imported, local)"})," will do the trick."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",children:"const importSpecifier = j.importSpecifier(\n  j.identifier('useContext'),\n  j.identifier('useFoo'),\n);\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Transform:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",children:"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  const reactImports = source\n    .find(j.ImportDeclaration)\n    .filter(path => path.node.source.value === 'react');\n\n  // Build our new import specifier\n  const importSpecifier = j.importSpecifier(\n    j.identifier('useContext'),\n    j.identifier('useFoo'),\n  );\n\n  reactImports.forEach(reactImport =>\n    j(reactImport).replaceWith(\n      j.importDeclaration(\n        [...reactImport.node.specifiers, importSpecifier], // Insert our new import specificer\n        reactImport.node.source,\n      ),\n    ),\n  );\n\n  return source.toSource();\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Input:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Output:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:"+import React, { useEffect, useContext as useFoo } from 'react';\n-import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.h3,{id:"removing-an-import-specifier",children:"Removing an import specifier"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Transform:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",children:"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  source\n    .find(j.ImportDeclaration)\n    .filter(path => path.node.source.value === 'react')\n    .find(j.ImportSpecifier)\n    .filter(path => path.node.imported.name === 'useEffect')\n    .remove();\n\n  return source.toSource();\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Input:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Output:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:"+import React from 'react';\n-import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.h3,{id:"replacerename-an-import-specifier",children:"Replace/Rename an import specifier"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Transform:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",children:"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  // Build an import specifier\n  const newImport = j.importSpecifier(j.identifier('useFoo'));\n\n  source\n    .find(j.ImportDeclaration)\n    .filter(path => path.node.source.value === 'react')\n    .find(j.ImportSpecifier)\n    .filter(path => path.node.imported.name === 'useEffect')\n    .replaceWith(newImport); // Insert our new import specifier\n\n  return source.toSource();\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Input:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Output:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:"+import React, { useFoo } from 'react';\n-import React, { useEffect } from 'react';\n\nconst Button = props => <button {...props} />;\n"})})]})}function d(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>s,x:()=>c});var t=r(6540);const o={},i=t.createContext(o);function s(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);