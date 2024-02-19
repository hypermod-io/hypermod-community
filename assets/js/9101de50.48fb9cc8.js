"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[350],{5680:(t,e,a)=>{a.d(e,{xA:()=>c,yg:()=>u});var r=a(6540);function n(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function o(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?o(Object(a),!0).forEach((function(e){n(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function s(t,e){if(null==t)return{};var a,r,n=function(t,e){if(null==t)return{};var a,r,n={},o=Object.keys(t);for(r=0;r<o.length;r++)a=o[r],e.indexOf(a)>=0||(n[a]=t[a]);return n}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)a=o[r],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}var p=r.createContext({}),l=function(t){var e=r.useContext(p),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},c=function(t){var e=l(t.components);return r.createElement(p.Provider,{value:e},t.children)},m="mdxType",d={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},y=r.forwardRef((function(t,e){var a=t.components,n=t.mdxType,o=t.originalType,p=t.parentName,c=s(t,["components","mdxType","originalType","parentName"]),m=l(a),y=n,u=m["".concat(p,".").concat(y)]||m[y]||d[y]||o;return a?r.createElement(u,i(i({ref:e},c),{},{components:a})):r.createElement(u,i({ref:e},c))}));function u(t,e){var a=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var o=a.length,i=new Array(o);i[0]=y;var s={};for(var p in e)hasOwnProperty.call(e,p)&&(s[p]=e[p]);s.originalType=t,s[m]="string"==typeof t?t:n,i[1]=s;for(var l=2;l<o;l++)i[l]=a[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}y.displayName="MDXCreateElement"},214:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var r=a(8168),n=(a(6540),a(5680));const o={id:"atlaskit__avatar",title:"atlaskit/avatar",slug:"/registry/atlaskit__avatar",keywords:["codemods","atlaskit/avatar","code evolution","code migration","package updates","automated code updates"],description:"Explore codemods for @atlaskit/avatar."},i=void 0,s={unversionedId:"registry-generated/atlaskit__avatar",id:"registry-generated/atlaskit__avatar",title:"atlaskit/avatar",description:"Explore codemods for @atlaskit/avatar.",source:"@site/docs/registry-generated/@atlaskit__avatar.mdx",sourceDirName:"registry-generated",slug:"/registry/atlaskit__avatar",permalink:"/docs/registry/atlaskit__avatar",draft:!1,editUrl:"https://github.com/hypermod-io/hypermod-community/edit/main/website/docs/registry-generated/@atlaskit__avatar.mdx",tags:[],version:"current",frontMatter:{id:"atlaskit__avatar",title:"atlaskit/avatar",slug:"/registry/atlaskit__avatar",keywords:["codemods","atlaskit/avatar","code evolution","code migration","package updates","automated code updates"],description:"Explore codemods for @atlaskit/avatar."},sidebar:"registry",previous:{title:"Registry",permalink:"/docs/registry"},next:{title:"atlaskit/breadcrumbs",permalink:"/docs/registry/atlaskit__breadcrumbs"}},p={},l=[{value:"Transforms",id:"transforms",level:2},{value:"18.0.0",id:"1800",level:3},{value:"19.0.0",id:"1900",level:3}],c={toc:l},m="wrapper";function d(t){let{components:e,...a}=t;return(0,n.yg)(m,(0,r.A)({},c,a,{components:e,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("strong",{parentName:"p"},"Target package(s):")),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"https://www.npmjs.com/package/@atlaskit/avatar"},"@atlaskit/avatar"))),(0,n.yg)("p",null,(0,n.yg)("strong",{parentName:"p"},"Maintainers:")),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"https://github.com/danieldelcore"},"danieldelcore"))),(0,n.yg)("h2",{id:"transforms"},"Transforms"),(0,n.yg)("h3",{id:"1800"},"18.0.0"),(0,n.yg)("admonition",{type:"info"},(0,n.yg)("p",{parentName:"admonition"},(0,n.yg)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/tree/main/community/%40atlaskit__avatar"},"Source")," | ",(0,n.yg)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/issues/new?title=atlaskit__avatar@18.0.0"},"Report an issue")),(0,n.yg)("p",{parentName:"admonition"},(0,n.yg)("strong",{parentName:"p"},"Usage")," ",(0,n.yg)("inlineCode",{parentName:"p"},"$ hypermod --packages @atlaskit__avatar@18.0.0 path/to/source"))),(0,n.yg)("p",null,"A codemod which facilitates the migration of the ",(0,n.yg)("a",{parentName:"p",href:"https://www.npmjs.com/package/@atlaskit/avatar"},"@atlaskit/avatar")," package to version 18.0.0."),(0,n.yg)("h3",{id:"1900"},"19.0.0"),(0,n.yg)("admonition",{type:"info"},(0,n.yg)("p",{parentName:"admonition"},(0,n.yg)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/tree/main/community/%40atlaskit__avatar"},"Source")," | ",(0,n.yg)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/issues/new?title=atlaskit__avatar@19.0.0"},"Report an issue")),(0,n.yg)("p",{parentName:"admonition"},(0,n.yg)("strong",{parentName:"p"},"Usage")," ",(0,n.yg)("inlineCode",{parentName:"p"},"$ hypermod --packages @atlaskit__avatar@19.0.0 path/to/source"))),(0,n.yg)("p",null,"A codemod which facilitates the migration of the ",(0,n.yg)("a",{parentName:"p",href:"https://www.npmjs.com/package/@atlaskit/avatar"},"@atlaskit/avatar")," package to version 19.0.0."))}d.isMDXComponent=!0}}]);