"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[6325],{3905:function(e,t,r){r.d(t,{Zo:function(){return c},kt:function(){return g}});var o=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,o,a=function(e,t){if(null==e)return{};var r,o,a={},n=Object.keys(e);for(o=0;o<n.length;o++)r=n[o],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)r=n[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=o.createContext({}),m=function(e){var t=o.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=m(e.components);return o.createElement(s.Provider,{value:t},e.children)},l="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var r=e.components,a=e.mdxType,n=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),l=m(r),d=a,g=l["".concat(s,".").concat(d)]||l[d]||u[d]||n;return r?o.createElement(g,i(i({ref:t},c),{},{components:r})):o.createElement(g,i({ref:t},c))}));function g(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var n=r.length,i=new Array(n);i[0]=d;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[l]="string"==typeof e?e:a,i[1]=p;for(var m=2;m<n;m++)i[m]=r[m];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}d.displayName="MDXCreateElement"},177:function(e,t,r){r.r(t),r.d(t,{assets:function(){return s},contentTitle:function(){return i},default:function(){return u},frontMatter:function(){return n},metadata:function(){return p},toc:function(){return m}});var o=r(3117),a=(r(7294),r(3905));const n={id:"javascript",title:"javascript",slug:"/registry/javascript",keywords:["codemods","javascript","code evolution","code migration","package updates","automated code updates"],description:"Explore codemods for javascript."},i=void 0,p={unversionedId:"registry-generated/javascript",id:"registry-generated/javascript",title:"javascript",description:"Explore codemods for javascript.",source:"@site/docs/registry-generated/javascript.mdx",sourceDirName:"registry-generated",slug:"/registry/javascript",permalink:"/docs/registry/javascript",draft:!1,editUrl:"https://github.com/hypermod-io/hypermod-community/edit/main/website/docs/registry-generated/javascript.mdx",tags:[],version:"current",frontMatter:{id:"javascript",title:"javascript",slug:"/registry/javascript",keywords:["codemods","javascript","code evolution","code migration","package updates","automated code updates"],description:"Explore codemods for javascript."},sidebar:"registry",previous:{title:"emotion/monorepo",permalink:"/docs/registry/emotion__monorepo"},next:{title:"memoize-one",permalink:"/docs/registry/memoize-one"}},s={},m=[{value:"Presets",id:"presets",level:2},{value:"remove-console-log",id:"remove-console-log",level:3},{value:"remove-debugger",id:"remove-debugger",level:3},{value:"sort-object-props",id:"sort-object-props",level:3},{value:"var-to-let",id:"var-to-let",level:3},{value:"remove-unused-vars",id:"remove-unused-vars",level:3}],c={toc:m},l="wrapper";function u(e){let{components:t,...r}=e;return(0,a.kt)(l,(0,o.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Maintainers:")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/danieldelcore"},"danieldelcore"))),(0,a.kt)("h2",{id:"presets"},"Presets"),(0,a.kt)("h3",{id:"remove-console-log"},"remove-console-log"),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/tree/main/community/javascript"},"Source")," | ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/issues/new?title=javascript@remove-console-log"},"Report an issue")),(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("strong",{parentName:"p"},"Usage")," ",(0,a.kt)("inlineCode",{parentName:"p"},"$ codeshift --packages javascript#remove-console-log path/to/source"))),(0,a.kt)("p",null,"Removes all ",(0,a.kt)("inlineCode",{parentName:"p"},"console.log")," statements."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"/* INPUT */\nconsole.log('hello world');\nfoo('bar');\n\n/* OUTPUT */\nfoo('bar');\n")),(0,a.kt)("h3",{id:"remove-debugger"},"remove-debugger"),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/tree/main/community/javascript"},"Source")," | ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/issues/new?title=javascript@remove-debugger"},"Report an issue")),(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("strong",{parentName:"p"},"Usage")," ",(0,a.kt)("inlineCode",{parentName:"p"},"$ codeshift --packages javascript#remove-debugger path/to/source"))),(0,a.kt)("p",null,"Removes all ",(0,a.kt)("inlineCode",{parentName:"p"},"debugger")," statements."),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"Credit"),": ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/JamieMason/codemods"},"https://github.com/JamieMason/codemods")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"/* INPUT */\nconsole.log('hello world');\ndebugger;\n\n/* OUTPUT */\nconsole.log('hello world');\n")),(0,a.kt)("h3",{id:"sort-object-props"},"sort-object-props"),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/tree/main/community/javascript"},"Source")," | ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/issues/new?title=javascript@sort-object-props"},"Report an issue")),(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("strong",{parentName:"p"},"Usage")," ",(0,a.kt)("inlineCode",{parentName:"p"},"$ codeshift --packages javascript#sort-object-props path/to/source"))),(0,a.kt)("p",null,"Sort members of Object Literals alphabetically."),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"Credit"),": ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/JamieMason/codemods"},"https://github.com/JamieMason/codemods")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"/* INPUT */\nconst players = { messi: true, bergkamp: true, ginola: true };\n\n/* OUTPUT */\nconst players = { bergkamp: true, ginola: true, messi: true };\n")),(0,a.kt)("h3",{id:"var-to-let"},"var-to-let"),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/tree/main/community/javascript"},"Source")," | ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/issues/new?title=javascript@var-to-let"},"Report an issue")),(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("strong",{parentName:"p"},"Usage")," ",(0,a.kt)("inlineCode",{parentName:"p"},"$ codeshift --packages javascript#var-to-let path/to/source"))),(0,a.kt)("p",null,"Replace all ",(0,a.kt)("inlineCode",{parentName:"p"},"var")," calls to use ",(0,a.kt)("inlineCode",{parentName:"p"},"let"),"."),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"Credit"),": ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/JamieMason/codemods"},"https://github.com/JamieMason/codemods")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"/* INPUT */\nvar foo = 'foo';\n\n/* OUTPUT */\nlet foo = 'foo';\n")),(0,a.kt)("h3",{id:"remove-unused-vars"},"remove-unused-vars"),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/tree/main/community/javascript"},"Source")," | ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/issues/new?title=javascript@remove-unused-vars"},"Report an issue")),(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("strong",{parentName:"p"},"Usage")," ",(0,a.kt)("inlineCode",{parentName:"p"},"$ codeshift --packages javascript#remove-unused-vars path/to/source"))),(0,a.kt)("p",null,"Codemods for javascript#remove-unused-vars"),(0,a.kt)("p",null,"Detects and removes unused variables in JavaScript code."),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"Credit:")," ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-unused-variables#readme"},"https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-unused-variables")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"/* INPUT */\nconst x = 1;\nconst y = 2;\nconsole.log(y);\n\n/* OUTPUT */\nconst y = 2;\nconsole.log(y);\n")))}u.isMDXComponent=!0}}]);