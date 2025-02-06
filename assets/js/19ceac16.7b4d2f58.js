"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[5820],{9381:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>d,contentTitle:()=>s,default:()=>m,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var t=n(4848),r=n(8453);const i={id:"when-not-to-codemod",title:"When not to codemod",slug:"/when-not-to-codemod"},s=void 0,a={id:"guides/when-not-to-codemod",title:"When not to codemod",description:"Unfortunately Codemods aren't the solution to every problem, so as an author you have to weigh-up whether it's feasible before investing time into writing one.",source:"@site/docs/guides/when-not-to-codemod.mdx",sourceDirName:"guides",slug:"/when-not-to-codemod",permalink:"/hypermod-community/docs/when-not-to-codemod",draft:!1,unlisted:!1,editUrl:"https://github.com/hypermod-io/hypermod-community/edit/main/website/docs/guides/when-not-to-codemod.mdx",tags:[],version:"current",frontMatter:{id:"when-not-to-codemod",title:"When not to codemod",slug:"/when-not-to-codemod"},sidebar:"docs",previous:{title:"Understanding ASTs",permalink:"/hypermod-community/docs/understanding-asts"},next:{title:"Prompting for human input",permalink:"/hypermod-community/docs/prompting-for-human-input"}},d={},l=[{value:"When a codemod doesn&#39;t make sense?",id:"when-a-codemod-doesnt-make-sense",level:2},{value:"API / feature removal",id:"api--feature-removal",level:3},{value:"There&#39;s too much human intervention required.",id:"theres-too-much-human-intervention-required",level:3},{value:"Changes that need an awareness of runtime usage",id:"changes-that-need-an-awareness-of-runtime-usage",level:3},{value:"Indirection",id:"indirection",level:3},{value:"Usage paradigm shifts where the old paradigm does not have a 1:1 in the new paradigm",id:"usage-paradigm-shifts-where-the-old-paradigm-does-not-have-a-11-in-the-new-paradigm",level:3},{value:"Consumers need to provide more information than they did before",id:"consumers-need-to-provide-more-information-than-they-did-before",level:3},{value:"What to do when a codemod isn&#39;t possible?",id:"what-to-do-when-a-codemod-isnt-possible",level:2},{value:"Prompt for user input",id:"prompt-for-user-input",level:3},{value:"Aliasing",id:"aliasing",level:3}];function c(e){const o={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.p,{children:"Unfortunately Codemods aren't the solution to every problem, so as an author you have to weigh-up whether it's feasible before investing time into writing one."}),"\n",(0,t.jsx)(o.p,{children:"Here is a list of some use-cases that are not possible or extremely hard to codemod and some possible alternatives."}),"\n",(0,t.jsx)(o.h2,{id:"when-a-codemod-doesnt-make-sense",children:"When a codemod doesn't make sense?"}),"\n",(0,t.jsx)(o.h3,{id:"api--feature-removal",children:"API / feature removal"}),"\n",(0,t.jsx)(o.p,{children:"When a part of your API has been removed without an alternative"}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-js",children:"import { foo, bar, DEPRECATED_BAZ } from 'my-module';\n\nconsole.log(DEPRECATED_BAZ());\n"})}),"\n",(0,t.jsxs)(o.p,{children:["In this case a codemod to remove ",(0,t.jsx)(o.code,{children:"DEPRECATED_BAZ"})," will lead to the following error"]}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-diff",children:"-import { foo, bar, DEPRECATED_BAZ} from 'my-module';\n+import { foo, bar } from 'my-module';\n\nconsole.log(DEPRECATED_BAZ()); // \ud83d\udca5 Uncaught ReferenceError: DEPRECATED_BAZ is not defined\n"})}),"\n",(0,t.jsx)(o.h3,{id:"theres-too-much-human-intervention-required",children:"There's too much human intervention required."}),"\n",(0,t.jsx)(o.p,{children:"Sometimes a change simply requires too much human intervention. These are usually cases where there might be implicit side-effects to your changes and you cannot write a codemod that will confidently get you from A-B."}),"\n",(0,t.jsx)(o.p,{children:"For example, consider moving from React class components to a hooks based function component. Changes in the React API might have implicit differences that all need to be accounted for. And moving blocks of logic from one to the other might seem possible at first but will completely become over complicated and not worth your time."}),"\n",(0,t.jsx)(o.h3,{id:"changes-that-need-an-awareness-of-runtime-usage",children:"Changes that need an awareness of runtime usage"}),"\n",(0,t.jsx)(o.p,{children:"For example: When you need the full runtime result of a React tree"}),"\n",(0,t.jsx)(o.h3,{id:"indirection",children:"Indirection"}),"\n",(0,t.jsx)(o.p,{children:"Indirection is one of the biggest hurdles codemods have to overcome.\nAnytime we run into indirection, it is harder to statically analyse how a piece of code is being used and have to take different approaches to work around it."}),"\n",(0,t.jsx)(o.p,{children:"Indirection as several forms and can include working across module boundaries, using object spreading, dependency injection and so on. Keep an eye out for these cases."}),"\n",(0,t.jsxs)(o.p,{children:["For example, consider removing ",(0,t.jsx)(o.code,{children:"DEPRECATED_BAZ"})," from ",(0,t.jsx)(o.code,{children:"my-module"})," when it's imported and used like so:"]}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-jsx",children:"// src/utils/my-module.js\nexport {\n  DEPRECATED_BAZ: 'DEPRECATED_BAZ',\n  foo: () => 'hello',\n};\n"})}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-js",children:"// src/components/App.js\nimport React from 'react';\nimport * as utils from '../utils/my-module';\n\nconst App = props => {\n  return <div {...props} {...utils} />;\n};\n"})}),"\n",(0,t.jsxs)(o.p,{children:['In this case, because we\'re using "rest" in our import statement and then "spreading" it onto our component, we\'re not able to guarantee that you\'ll be able to safely remove all usages of the ',(0,t.jsx)(o.code,{children:"DEPRECATED_BAZ"})," function."]}),"\n",(0,t.jsx)(o.h3,{id:"usage-paradigm-shifts-where-the-old-paradigm-does-not-have-a-11-in-the-new-paradigm",children:"Usage paradigm shifts where the old paradigm does not have a 1:1 in the new paradigm"}),"\n",(0,t.jsx)(o.p,{children:"Sometimes changes between package versions don't have a clear 1:1 mapping. Say in the previous version of our package you solved a problem with one approach and decided that in the new version of your package an entirely new architecture is required to solve that problem holistically. Resulting in a change so different from the original that there's no clear 1:1 mapping."}),"\n",(0,t.jsx)(o.h3,{id:"consumers-need-to-provide-more-information-than-they-did-before",children:"Consumers need to provide more information than they did before"}),"\n",(0,t.jsx)(o.p,{children:"In some cases, you might need to ask your consumer to provide more information to your API than you were asking for prior."}),"\n",(0,t.jsx)(o.p,{children:"For example when a component now requires a new prop to function properly:"}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-js",children:"import React from 'react';\nimport MyComponent from '../utils/my-module';\n\nconst App = props => {\n  return <div {...props} securityToken=\"???\" />;\n};\n"})}),"\n",(0,t.jsx)(o.h2,{id:"what-to-do-when-a-codemod-isnt-possible",children:"What to do when a codemod isn't possible?"}),"\n",(0,t.jsx)(o.h3,{id:"prompt-for-user-input",children:"Prompt for user input"}),"\n",(0,t.jsx)(o.p,{children:"In most cases, we recommend that you aim to do as much of the work as possible, right up until you can't reasonably to anymore. Then prompt users for their intervention."}),"\n",(0,t.jsxs)(o.p,{children:["Let's use our previous scenario as an example. Say your component now requires an additional ",(0,t.jsx)(o.code,{children:"securityToken"})," prop to function safely, but you need a user to actually to the work to first get the token and then safely add it to your file."]}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-jsx",children:"import React from 'react';\nimport MyComponent from '../utils/my-module';\n\nconst App = props => {\n  return <div {...props} securityToken=\"???\" />;\n};\n"})}),"\n",(0,t.jsx)(o.p,{children:"This is a great candidate for prompting for user input. Whenever you come across a scenario like this, we recommend leaving comments like so:"}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-diff",children:"import React from 'react';\nimport MyComponent from '../utils/my-module';\n\n+/** TODO (Codemod generated): Please provide a security token here */\nconst App = props => {\n  return <div {...props} securityToken=\"???\" />;\n};\n"})}),"\n",(0,t.jsxs)(o.p,{children:["For more information on how to write a transform that does this, please refer to the ",(0,t.jsx)(o.a,{href:"/docs/prompting-for-human-input",children:"prompting for human input guide"}),"."]}),"\n",(0,t.jsx)(o.h3,{id:"aliasing",children:"Aliasing"}),"\n",(0,t.jsx)(o.p,{children:'You might come across the case where an "ideal" solution is too complex or too full of edge cases to do reasonably. When this happens, consider looking for a less than ideal but working solution.'}),"\n",(0,t.jsx)(o.p,{children:"Consider the relatively trivial scenario of renaming an import:"}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-diff",children:"+import { Foo, Baz } from 'my-module';\n-import { Foo, Bar } from 'my-module';\n\n+console.log(Baz);\n-console.log(Bar);\n"})}),"\n",(0,t.jsx)(o.p,{children:"At first you might think it's a good idea to simply rename the import and look for all references of that import in your code.\nBut what happens when your import can be used in many different contexts."}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-diff",children:"+import { Foo, Baz } from 'my-module';\n-import { Foo, Bar } from 'my-module';\n\n+console.log(Baz);\n-console.log(Bar);\n\nconst App = props => {\n+ return <Bar {...props} />;\n- return <Baz {...props} />;\n};\n"})}),"\n",(0,t.jsxs)(o.p,{children:["You now have to expand your transform to not only look for ",(0,t.jsx)(o.code,{children:"Identifiers"})," with the name ",(0,t.jsx)(o.code,{children:"Baz"})," but also ",(0,t.jsx)(o.code,{children:"JsxExpressions"})," and maybe more?"]}),"\n",(0,t.jsx)(o.p,{children:"What if we could side-step that entire part of the transform and simply alias the import instead?"}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-diff",children:"+import { Foo, Baz as Bar } from 'my-module';\n-import { Foo, Bar } from 'my-module';\n\nconsole.log(Bar);\n\nconst App = props => {\n  return <Bar {...props} />;\n};\n"})}),"\n",(0,t.jsx)(o.p,{children:"Although you might see this result as less than ideal, since the logic still refers to the old name. It's still a great solution to the problem because we now have a codemod that is a lot simpler (because we can get rid of half of the find and replace logic) and safer (because it will always work regardless of the usage).\nKeep this in mind, next time you're running into countless edge-cases."})]})}function m(e={}){const{wrapper:o}={...(0,r.R)(),...e.components};return o?(0,t.jsx)(o,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},8453:(e,o,n)=>{n.d(o,{R:()=>s,x:()=>a});var t=n(6540);const r={},i=t.createContext(r);function s(e){const o=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function a(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),t.createElement(i.Provider,{value:o},e.children)}}}]);