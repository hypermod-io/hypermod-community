"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[6059],{5781:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>a,contentTitle:()=>i,default:()=>c,frontMatter:()=>s,metadata:()=>d,toc:()=>m});var n=o(4848),r=o(8453);const s={id:"hypermod",title:"hypermod",slug:"/registry/hypermod",keywords:["codemods","hypermod","code evolution","code migration","package updates","automated code updates"],description:"Explore codemods for hypermod."},i=void 0,d={id:"registry-generated/hypermod",title:"hypermod",description:"Explore codemods for hypermod.",source:"@site/docs/registry-generated/hypermod.mdx",sourceDirName:"registry-generated",slug:"/registry/hypermod",permalink:"/docs/registry/hypermod",draft:!1,unlisted:!1,editUrl:"https://github.com/hypermod-io/hypermod-community/edit/main/website/docs/registry-generated/hypermod.mdx",tags:[],version:"current",frontMatter:{id:"hypermod",title:"hypermod",slug:"/registry/hypermod",keywords:["codemods","hypermod","code evolution","code migration","package updates","automated code updates"],description:"Explore codemods for hypermod."},sidebar:"registry",previous:{title:"emotion/monorepo",permalink:"/docs/registry/emotion__monorepo"},next:{title:"javascript",permalink:"/docs/registry/javascript"}},a={},m=[{value:"Presets",id:"presets",level:2},{value:"defineInlineTest-to-applyTransform",id:"defineinlinetest-to-applytransform",level:3}];function p(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{id:"presets",children:"Presets"}),"\n",(0,n.jsx)(t.h3,{id:"defineinlinetest-to-applytransform",children:"defineInlineTest-to-applyTransform"}),"\n",(0,n.jsxs)(t.admonition,{type:"info",children:[(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"https://github.com/hypermod-io/hypermod-community/tree/main/community/hypermod",children:"Source"})," | ",(0,n.jsx)(t.a,{href:"https://github.com/hypermod-io/hypermod-community/issues/new?title=hypermod@defineInlineTest-to-applyTransform",children:"Report an issue"})]}),(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Usage"})," ",(0,n.jsx)(t.code,{children:"$ hypermod --packages hypermod#defineInlineTest-to-applyTransform path/to/source"})]})]}),"\n",(0,n.jsx)(t.p,{children:"Codemods for hypermod#defineInlineTest-to-applyTransform"}),"\n",(0,n.jsxs)(t.p,{children:["This codemod transforms test cases written with ",(0,n.jsx)(t.code,{children:"defineInlineTest"})," from ",(0,n.jsx)(t.code,{children:"jscodeshift`` to use the "}),"applyTransform",(0,n.jsx)(t.code,{children:"function from"}),"@hypermod/utils`. Below is an example of the transformation:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:'/* INPUT */\nconst defineInlineTest = require(\'jscodeshift/dist/testUtils\').defineInlineTest;\n\ndefineInlineTest(\n  { default: transformer, parser: \'tsx\' },\n  {},\n  `\n      import React from "react";\n      import Tag from "@atlaskit/tag";\n      export default () => <Tag text="Removable button"/>;\n    `,\n  `\n      import React from "react";\n      import Tag from "@atlaskit/tag";\n      export default () => <Tag text="Removable button"/>;\n    `,\n  \'should not add isRemovable flag when no removeButtonText defined\',\n);\n\n/* OUTPUT */\nimport { applyTransform } from \'@hypermod/utils\';\n\nit(\'should not add isRemovable flag when no removeButtonText defined\', async () => {\n  const result = await applyTransform(\n    transformer,\n    `\n      import React from "react";\n      import Tag from "@atlaskit/tag";\n      export default () => <Tag text="Removable button"/>;\n    `,\n    { parser: \'tsx\' },\n  );\n  expect(result).toMatchInlineSnapshot(`\n    "import React from "react";\n    import Tag from "@atlaskit/tag";\n    export default () => <Tag text="Removable button"/>;"\n  `);\n});\n'})})]})}function c(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(p,{...e})}):p(e)}},8453:(e,t,o)=>{o.d(t,{R:()=>i,x:()=>d});var n=o(6540);const r={},s=n.createContext(r);function i(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);