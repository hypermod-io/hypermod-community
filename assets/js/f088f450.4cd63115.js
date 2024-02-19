"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[4540],{5680:(e,t,r)=>{r.d(t,{xA:()=>s,yg:()=>y});var o=r(6540);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function m(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},i=Object.keys(e);for(o=0;o<i.length;o++)r=i[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)r=i[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=o.createContext({}),c=function(e){var t=o.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},s=function(e){var t=c(e.components);return o.createElement(p.Provider,{value:t},e.children)},l="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,p=e.parentName,s=m(e,["components","mdxType","originalType","parentName"]),l=c(r),u=n,y=l["".concat(p,".").concat(u)]||l[u]||d[u]||i;return r?o.createElement(y,a(a({ref:t},s),{},{components:r})):o.createElement(y,a({ref:t},s))}));function y(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,a=new Array(i);a[0]=u;var m={};for(var p in t)hasOwnProperty.call(t,p)&&(m[p]=t[p]);m.originalType=e,m[l]="string"==typeof e?e:n,a[1]=m;for(var c=2;c<i;c++)a[c]=r[c];return o.createElement.apply(null,a)}return o.createElement.apply(null,r)}u.displayName="MDXCreateElement"},7951:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>m,toc:()=>c});var o=r(8168),n=(r(6540),r(5680));const i={id:"memoize-one",title:"memoize-one",slug:"/registry/memoize-one",keywords:["codemods","memoize-one","code evolution","code migration","package updates","automated code updates"],description:"Explore codemods for memoize-one."},a=void 0,m={unversionedId:"registry-generated/memoize-one",id:"registry-generated/memoize-one",title:"memoize-one",description:"Explore codemods for memoize-one.",source:"@site/docs/registry-generated/memoize-one.mdx",sourceDirName:"registry-generated",slug:"/registry/memoize-one",permalink:"/docs/registry/memoize-one",draft:!1,editUrl:"https://github.com/hypermod-io/hypermod-community/edit/main/website/docs/registry-generated/memoize-one.mdx",tags:[],version:"current",frontMatter:{id:"memoize-one",title:"memoize-one",slug:"/registry/memoize-one",keywords:["codemods","memoize-one","code evolution","code migration","package updates","automated code updates"],description:"Explore codemods for memoize-one."},sidebar:"registry",previous:{title:"javascript",permalink:"/docs/registry/javascript"},next:{title:"react",permalink:"/docs/registry/react"}},p={},c=[{value:"Transforms",id:"transforms",level:2},{value:"5.0.0",id:"500",level:3}],s={toc:c},l="wrapper";function d(e){let{components:t,...r}=e;return(0,n.yg)(l,(0,o.A)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("strong",{parentName:"p"},"Target package(s):")),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"https://www.npmjs.com/package/memoize-one"},"memoize-one"))),(0,n.yg)("p",null,(0,n.yg)("strong",{parentName:"p"},"Maintainers:")),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"https://github.com/alexreardon"},"alexreardon"))),(0,n.yg)("h2",{id:"transforms"},"Transforms"),(0,n.yg)("h3",{id:"500"},"5.0.0"),(0,n.yg)("admonition",{type:"info"},(0,n.yg)("p",{parentName:"admonition"},(0,n.yg)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/tree/main/community/memoize-one"},"Source")," | ",(0,n.yg)("a",{parentName:"p",href:"https://github.com/hypermod-io/hypermod-community/issues/new?title=memoize-one@5.0.0"},"Report an issue")),(0,n.yg)("p",{parentName:"admonition"},(0,n.yg)("strong",{parentName:"p"},"Usage")," ",(0,n.yg)("inlineCode",{parentName:"p"},"$ hypermod --packages memoize-one@5.0.0 path/to/source"))),(0,n.yg)("p",null,"A codemod which facilitates the migration of the ",(0,n.yg)("a",{parentName:"p",href:"https://www.npmjs.com/package/memoize-one"},"memoize-one")," package to version 5.0.0."))}d.isMDXComponent=!0}}]);