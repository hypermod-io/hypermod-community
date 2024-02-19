"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[4784],{5680:(e,n,t)=>{t.d(n,{xA:()=>m,yg:()=>g});var r=t(6540);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=r.createContext({}),u=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},m=function(e){var n=u(e.components);return r.createElement(s.Provider,{value:n},e.children)},c="mdxType",l={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,m=p(e,["components","mdxType","originalType","parentName"]),c=u(t),d=o,g=c["".concat(s,".").concat(d)]||c[d]||l[d]||i;return t?r.createElement(g,a(a({ref:n},m),{},{components:t})):r.createElement(g,a({ref:n},m))}));function g(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=d;var p={};for(var s in n)hasOwnProperty.call(n,s)&&(p[s]=n[s]);p.originalType=e,p[c]="string"==typeof e?e:o,a[1]=p;for(var u=2;u<i;u++)a[u]=t[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},4005:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>a,default:()=>l,frontMatter:()=>i,metadata:()=>p,toc:()=>u});var r=t(8168),o=(t(6540),t(5680));const i={id:"prompting-for-human-input",title:"Prompting for human input",slug:"/prompting-for-human-input"},a=void 0,p={unversionedId:"guides/prompting-for-human-input",id:"guides/prompting-for-human-input",title:"Prompting for human input",description:"When writing codemods, you might encounter a scenario where a specific migration might require human eyes, might not be possible or even not worth the amount of work required.",source:"@site/docs/guides/prompting-for-human-input.mdx",sourceDirName:"guides",slug:"/prompting-for-human-input",permalink:"/docs/prompting-for-human-input",draft:!1,editUrl:"https://github.com/hypermod-io/hypermod-community/edit/main/website/docs/guides/prompting-for-human-input.mdx",tags:[],version:"current",frontMatter:{id:"prompting-for-human-input",title:"Prompting for human input",slug:"/prompting-for-human-input"},sidebar:"docs",previous:{title:"When not to codemod",permalink:"/docs/when-not-to-codemod"},next:{title:"CSS codemods via PostCSS",permalink:"/docs/css-codemods"}},s={},u=[{value:"Inserting a comment",id:"inserting-a-comment",level:2}],m={toc:u},c="wrapper";function l(e){let{components:n,...t}=e;return(0,o.yg)(c,(0,r.A)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"When writing codemods, you might encounter a scenario where a specific migration might require human eyes, might not be possible or even ",(0,o.yg)("a",{parentName:"p",href:"/docs/when-not-to-codemod"},"not worth the amount of work required"),"."),(0,o.yg)("p",null,"In these scenarios, it's usually the best to migrate as much as you can and bail-out by ",(0,o.yg)("strong",{parentName:"p"},"prompting for human input"),"."),(0,o.yg)("p",null,"Or in other words: ",(0,o.yg)("strong",{parentName:"p"},'"Insert a comment"'),"."),(0,o.yg)("p",null,"Inserting comments as codemod output is a completely valid thing to do and highlights to maintainers that they need to manually complete the migration.\nWhen leaving comments, it's helpful to be as descriptive as possible, including all or as much of the context required for the maintainer."),(0,o.yg)("p",null,"Comments are also helpful because when a PR is raised, these prompts can easily be seen in the diff and actioned at the maintainers discretion. The key is to make the surface area of your codemod known and let maintainers know where they're needed."),(0,o.yg)("h2",{id:"inserting-a-comment"},"Inserting a comment"),(0,o.yg)("p",null,"Let's say your component now requires an additional prop ",(0,o.yg)("inlineCode",{parentName:"p"},"securityToken")," to function safely, but you need a user to manually enter the token.\nThis is a great candidate for prompting for user input."),(0,o.yg)("p",null,"Let's write a transform to do that:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-javascript"},"export default function transformer(file, { jscodeshift: j }, options) {\n  const source = j(file.source);\n\n  const newProp = source\n    .find(j.JSXIdentifier)\n    .filter(path => path.node.name === 'securityToken')\n    .forEach(path => {\n      path.value.comments = path.value.comments || [];\n      path.value.comments.push(\n        j.commentBlock(`\n        * TODO (Codemod generated): Please provide a security token.\n        * Visit https://www.my-project/security/tokens to generate a valid token.\n      `),\n      );\n    });\n\n  return source.toSource();\n}\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Input:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\nimport MyComponent from '../components/my-module';\n\nconst App = props => {\n  return <div {...props} securityToken=\"???\" />;\n};\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Output:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-diff"},"import React from 'react';\nimport MyComponent from '../components/my-module';\n\n+/**\n+ * TODO (Codemod generated): Please provide a security token.\n+ * Visit https://www.my-project/security/tokens to generate a valid token.\n+ */\nconst App = props => {\n  return <div {...props} securityToken=\"???\" />;\n};\n")))}l.isMDXComponent=!0}}]);