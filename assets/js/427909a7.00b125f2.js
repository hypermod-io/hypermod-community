"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[2277],{3905:(e,t,o)=>{o.d(t,{Zo:()=>d,kt:()=>h});var n=o(7294);function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function s(e,t){if(null==e)return{};var o,n,r=function(e,t){if(null==e)return{};var o,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||(r[o]=e[o]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var l=n.createContext({}),c=function(e){var t=n.useContext(l),o=t;return e&&(o="function"==typeof e?e(t):i(i({},t),e)),o},d=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var o=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=c(o),m=r,h=p["".concat(l,".").concat(m)]||p[m]||u[m]||a;return o?n.createElement(h,i(i({ref:t},d),{},{components:o})):n.createElement(h,i({ref:t},d))}));function h(e,t){var o=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=o.length,i=new Array(a);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:r,i[1]=s;for(var c=2;c<a;c++)i[c]=o[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,o)}m.displayName="MDXCreateElement"},9483:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var n=o(7462),r=(o(7294),o(3905));const a={id:"guiding-principles",title:"Guiding principles",slug:"/guiding-principles"},i=void 0,s={unversionedId:"guiding-principles",id:"guiding-principles",title:"Guiding principles",description:"There are several guiding principles we follow in this project.",source:"@site/docs/guiding-principles.mdx",sourceDirName:".",slug:"/guiding-principles",permalink:"/docs/guiding-principles",draft:!1,editUrl:"https://github.com/hypermod-io/hypermod-community/edit/main/website/docs/guiding-principles.mdx",tags:[],version:"current",frontMatter:{id:"guiding-principles",title:"Guiding principles",slug:"/guiding-principles"},sidebar:"docs",previous:{title:"Introduction",permalink:"/docs/"},next:{title:"FAQ",permalink:"/docs/faq"}},l={},c=[{value:"Codemods should target a version of package",id:"codemods-should-target-a-version-of-package",level:2},{value:"Codemods should be playable in sequence",id:"codemods-should-be-playable-in-sequence",level:2},{value:"Codemods should do as much as can be safely done automatically or prompt for human intervention",id:"codemods-should-do-as-much-as-can-be-safely-done-automatically-or-prompt-for-human-intervention",level:2}],d={toc:c},p="wrapper";function u(e){let{components:t,...o}=e;return(0,r.kt)(p,(0,n.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"There are several guiding principles we follow in this project."),(0,r.kt)("h2",{id:"codemods-should-target-a-version-of-package"},"Codemods should target a version of package"),(0,r.kt)("p",null,"Code is always on the move and codemods written against a specific API, at a specific point of time aren't guaranteed to work into the future.\nThat's why we should aim to limit the scope of a codemod to migrate a specific package from one API to another."),(0,r.kt)("p",null,"In doing so:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The scope and intent of a codemod is encoded and always obvious to users."),(0,r.kt)("li",{parentName:"ul"},"Changes to the package that occur thereafter should not affect or break older codemods."),(0,r.kt)("li",{parentName:"ul"},"Allow us to go back and patch older codemods if necessary.")),(0,r.kt)("p",null,"Conversely, if codemods were named arbitrarily, there will be no apparent sequence for the consumer to follow."),(0,r.kt)("h2",{id:"codemods-should-be-playable-in-sequence"},"Codemods should be playable in sequence"),(0,r.kt)("p",null,"By writing codemods that target a package and version, it should then be theoretically possible to move your consumers across multiple major versions by playing them in a sequence.\nFor example, migrating from an older version of ",(0,r.kt)("inlineCode",{parentName:"p"},"@mylib/button")," to the latest is possible by playing all available codemods in order ",(0,r.kt)("inlineCode",{parentName:"p"},"v14 -> v15 -> v16"),"."),(0,r.kt)("p",null,"Ultimately, this is the happy-path this project strives for. But it's also important to acknowledge that in reality this is not always be possible, depending on the migration path and how hard it might be to write a codemods for it.\nIn these cases we recommend that you are aware of ",(0,r.kt)("a",{parentName:"p",href:"/docs/when-not-to-codemod"},"when not to codemod")," and ",(0,r.kt)("a",{parentName:"p",href:"/docs/when-not-to-codemod#what-to-do-when-a-codemod-isnt-possible"},"what to do when a codemod isn't possible"),"."),(0,r.kt)("h2",{id:"codemods-should-do-as-much-as-can-be-safely-done-automatically-or-prompt-for-human-intervention"},"Codemods should do as much as can be safely done automatically or prompt for human intervention"),(0,r.kt)("p",null,"Writing a codemod to completely migrate a package from one working state to another is not always feasible. Some edge cases might simply be too hard to support.\nWhen this is the case, bailing out and prompting for human intervention should be your first fallback.\nThis gives consumers a chance to review the changes of the codemod, read the prompts containing context about the changes they need to action and make the remaining manual steps as painless and straight forward as possible."),(0,r.kt)("p",null,"For more information, please see the ",(0,r.kt)("a",{parentName:"p",href:"/docs/prompting-for-human-input"},"Prompting for human input")," guide."))}u.isMDXComponent=!0}}]);