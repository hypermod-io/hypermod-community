"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[9141],{3905:(t,e,a)=>{a.d(e,{Zo:()=>c,kt:()=>k});var r=a(7294);function n(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function o(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?o(Object(a),!0).forEach((function(e){n(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function s(t,e){if(null==t)return{};var a,r,n=function(t,e){if(null==t)return{};var a,r,n={},o=Object.keys(t);for(r=0;r<o.length;r++)a=o[r],e.indexOf(a)>=0||(n[a]=t[a]);return n}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)a=o[r],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}var p=r.createContext({}),l=function(t){var e=r.useContext(p),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},c=function(t){var e=l(t.components);return r.createElement(p.Provider,{value:e},t.children)},u="mdxType",m={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},d=r.forwardRef((function(t,e){var a=t.components,n=t.mdxType,o=t.originalType,p=t.parentName,c=s(t,["components","mdxType","originalType","parentName"]),u=l(a),d=n,k=u["".concat(p,".").concat(d)]||u[d]||m[d]||o;return a?r.createElement(k,i(i({ref:e},c),{},{components:a})):r.createElement(k,i({ref:e},c))}));function k(t,e){var a=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var o=a.length,i=new Array(o);i[0]=d;var s={};for(var p in e)hasOwnProperty.call(e,p)&&(s[p]=e[p]);s.originalType=t,s[u]="string"==typeof t?t:n,i[1]=s;for(var l=2;l<o;l++)i[l]=a[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}d.displayName="MDXCreateElement"},1968:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>p,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var r=a(7462),n=(a(7294),a(3905));const o={id:"atlaskit__button",title:"atlaskit/button",slug:"/registry/atlaskit__button",keywords:["codemods","atlaskit/button","code evolution","code migration","package updates","automated code updates"],description:"Explore codemods for @atlaskit/button."},i=void 0,s={unversionedId:"registry-generated/atlaskit__button",id:"registry-generated/atlaskit__button",title:"atlaskit/button",description:"Explore codemods for @atlaskit/button.",source:"@site/docs/registry-generated/@atlaskit__button.mdx",sourceDirName:"registry-generated",slug:"/registry/atlaskit__button",permalink:"/docs/registry/atlaskit__button",draft:!1,editUrl:"https://github.com/hypermod-io/hypermod-community/edit/main/website/docs/registry-generated/@atlaskit__button.mdx",tags:[],version:"current",frontMatter:{id:"atlaskit__button",title:"atlaskit/button",slug:"/registry/atlaskit__button",keywords:["codemods","atlaskit/button","code evolution","code migration","package updates","automated code updates"],description:"Explore codemods for @atlaskit/button."},sidebar:"registry",previous:{title:"atlaskit/breadcrumbs",permalink:"/docs/registry/atlaskit__breadcrumbs"},next:{title:"atlaskit/calendar",permalink:"/docs/registry/atlaskit__calendar"}},p={},l=[{value:"Transforms",id:"transforms",level:2},{value:"15.0.0",id:"1500",level:3},{value:"15.1.1",id:"1511",level:3}],c={toc:l},u="wrapper";function m(t){let{components:e,...a}=t;return(0,n.kt)(u,(0,r.Z)({},c,a,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Target package(s):")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://www.npmjs.com/package/@atlaskit/button"},"@atlaskit/button"))),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Maintainers:")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/danieldelcore"},"danieldelcore"))),(0,n.kt)("h2",{id:"transforms"},"Transforms"),(0,n.kt)("h3",{id:"1500"},"15.0.0"),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/tree/main/community/%40atlaskit__button"},"Source")," | ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/issues/new?title=atlaskit__button@15.0.0"},"Report an issue")),(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Usage")," ",(0,n.kt)("inlineCode",{parentName:"p"},"$ hypermod --packages @atlaskit__button@15.0.0 path/to/source"))),(0,n.kt)("p",null,"A codemod which facilitates the migration of the ",(0,n.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@atlaskit/button"},"@atlaskit/button")," package to version 15.0.0."),(0,n.kt)("h3",{id:"1511"},"15.1.1"),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/tree/main/community/%40atlaskit__button"},"Source")," | ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/issues/new?title=atlaskit__button@15.1.1"},"Report an issue")),(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Usage")," ",(0,n.kt)("inlineCode",{parentName:"p"},"$ hypermod --packages @atlaskit__button@15.1.1 path/to/source"))),(0,n.kt)("p",null,"A codemod which facilitates the migration of the ",(0,n.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@atlaskit/button"},"@atlaskit/button")," package to version 15.1.1."))}m.isMDXComponent=!0}}]);