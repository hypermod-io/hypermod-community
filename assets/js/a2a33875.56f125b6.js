"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[5559],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>u});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),m=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},d=function(e){var t=m(e.components);return n.createElement(s.Provider,{value:t},e.children)},l="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),l=m(r),f=o,u=l["".concat(s,".").concat(f)]||l[f]||c[f]||a;return r?n.createElement(u,i(i({ref:t},d),{},{components:r})):n.createElement(u,i({ref:t},d))}));function u(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=f;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[l]="string"==typeof e?e:o,i[1]=p;for(var m=2;m<a;m++)i[m]=r[m];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},7723:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>a,metadata:()=>p,toc:()=>m});var n=r(7462),o=(r(7294),r(3905));const a={id:"hypermod",title:"hypermod",slug:"/registry/hypermod",keywords:["codemods","hypermod","code evolution","code migration","package updates","automated code updates"],description:"Explore codemods for hypermod."},i=void 0,p={unversionedId:"registry-generated/hypermod",id:"registry-generated/hypermod",title:"hypermod",description:"Explore codemods for hypermod.",source:"@site/docs/registry-generated/hypermod.mdx",sourceDirName:"registry-generated",slug:"/registry/hypermod",permalink:"/docs/registry/hypermod",draft:!1,editUrl:"https://github.com/hypermod-io/hypermod-community/edit/main/website/docs/registry-generated/hypermod.mdx",tags:[],version:"current",frontMatter:{id:"hypermod",title:"hypermod",slug:"/registry/hypermod",keywords:["codemods","hypermod","code evolution","code migration","package updates","automated code updates"],description:"Explore codemods for hypermod."},sidebar:"registry",previous:{title:"emotion/monorepo",permalink:"/docs/registry/emotion__monorepo"},next:{title:"javascript",permalink:"/docs/registry/javascript"}},s={},m=[{value:"Presets",id:"presets",level:2},{value:"defineInlineTest-to-applyTransform",id:"defineinlinetest-to-applytransform",level:3}],d={toc:m},l="wrapper";function c(e){let{components:t,...r}=e;return(0,o.kt)(l,(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"presets"},"Presets"),(0,o.kt)("h3",{id:"defineinlinetest-to-applytransform"},"defineInlineTest-to-applyTransform"),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/tree/main/community/hypermod"},"Source")," | ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/issues/new?title=hypermod@defineInlineTest-to-applyTransform"},"Report an issue")),(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("strong",{parentName:"p"},"Usage")," ",(0,o.kt)("inlineCode",{parentName:"p"},"$ hypermod --packages hypermod#defineInlineTest-to-applyTransform path/to/source"))),(0,o.kt)("p",null,"Codemods for hypermod#defineInlineTest-to-applyTransform"),(0,o.kt)("p",null,"This codemod transforms test cases written with ",(0,o.kt)("inlineCode",{parentName:"p"},"defineInlineTest")," from ",(0,o.kt)("inlineCode",{parentName:"p"},"jscodeshift`` to use the "),"applyTransform",(0,o.kt)("inlineCode",{parentName:"p"},"function from"),"@hypermod/utils`. Below is an example of the transformation:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'/* INPUT */\nconst defineInlineTest = require(\'jscodeshift/dist/testUtils\').defineInlineTest;\n\ndefineInlineTest(\n  { default: transformer, parser: \'tsx\' },\n  {},\n  `\n      import React from "react";\n      import Tag from "@atlaskit/tag";\n      export default () => <Tag text="Removable button"/>;\n    `,\n  `\n      import React from "react";\n      import Tag from "@atlaskit/tag";\n      export default () => <Tag text="Removable button"/>;\n    `,\n  \'should not add isRemovable flag when no removeButtonText defined\',\n);\n\n/* OUTPUT */\nimport { applyTransform } from \'@hypermod/utils\';\n\nit(\'should not add isRemovable flag when no removeButtonText defined\', async () => {\n  const result = await applyTransform(\n    transformer,\n    `\n      import React from "react";\n      import Tag from "@atlaskit/tag";\n      export default () => <Tag text="Removable button"/>;\n    `,\n    { parser: \'tsx\' },\n  );\n  expect(result).toMatchInlineSnapshot(`\n    "import React from "react";\n    import Tag from "@atlaskit/tag";\n    export default () => <Tag text="Removable button"/>;"\n  `);\n});\n')))}c.isMDXComponent=!0}}]);