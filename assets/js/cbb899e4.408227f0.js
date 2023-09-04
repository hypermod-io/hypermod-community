"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[196],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(n),m=o,f=u["".concat(c,".").concat(m)]||u[m]||d[m]||i;return n?r.createElement(f,a(a({ref:t},l),{},{components:n})):r.createElement(f,a({ref:t},l))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[u]="string"==typeof e?e:o,a[1]=s;for(var p=2;p<i;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9326:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return a},default:function(){return d},frontMatter:function(){return i},metadata:function(){return s},toc:function(){return p}});var r=n(3117),o=(n(7294),n(3905));const i={id:"configuration",title:"Configuration",slug:"/configuration",description:"Learn how to configure Hypermod. This page covers the different ways you can configure codemods withing your codebase.",keywords:["codemod","configuration","presets","deployment","publishing"]},a=void 0,s={unversionedId:"configuration",id:"configuration",title:"Configuration",description:"Learn how to configure Hypermod. This page covers the different ways you can configure codemods withing your codebase.",source:"@site/docs/configuration.mdx",sourceDirName:".",slug:"/configuration",permalink:"/docs/configuration",draft:!1,editUrl:"https://github.com/hypermod-io/hypermod-community/edit/main/website/docs/configuration.mdx",tags:[],version:"current",frontMatter:{id:"configuration",title:"Configuration",slug:"/configuration",description:"Learn how to configure Hypermod. This page covers the different ways you can configure codemods withing your codebase.",keywords:["codemod","configuration","presets","deployment","publishing"]},sidebar:"docs",previous:{title:"Consuming",permalink:"/docs/consuming"},next:{title:"Testing",permalink:"/docs/testing"}},c={},p=[{value:"Properties",id:"properties",level:2},{value:"<code>maintainers</code>",id:"maintainers",level:3},{value:"<code>description</code>",id:"description",level:3},{value:"<code>transforms</code>",id:"transforms",level:3},{value:"<code>presets</code>",id:"presets",level:3},{value:"<code>targets</code>",id:"targets",level:3}],l={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"All hypermod packages must be coupled with a ",(0,o.kt)("inlineCode",{parentName:"p"},"hypermod.config.js")," file.\nThis file acts as the entry-point of your hypermod package and is responsible for holding all of the relevant metadata, as well as paths to the transformer functions themselves."),(0,o.kt)("p",null,"They typically look like this:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"module.exports = {\n  maintainers: ['danieldelcore'],\n  description: 'Codemods for the foobar package',\n  targets: ['foobar'],\n  transforms: {\n    '18.0.0': require('./18.0.0/transform'),\n    '19.0.0': require('./19.0.0/transform'),\n  },\n  presets: {\n    'sort-imports': require('./sort-imports/transform'),\n  },\n};\n")),(0,o.kt)("p",null,"These files should always be in the root directory of your package to ensure ",(0,o.kt)("inlineCode",{parentName:"p"},"hypermod")," has access to it.\nIt does so by pulling your package directly from NPM and searching the root directory, which by extension means you should always ensure that the config and the transform files are not ignored by npm."),(0,o.kt)("p",null,"Config files can be written in either JavaScript or TypeScript, depending on your preference."),(0,o.kt)("p",null,"To check if your config is valid, you can use ",(0,o.kt)("a",{parentName:"p",href:"cli#validate"},"the validate command"),"."),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("h3",{id:"maintainers"},(0,o.kt)("inlineCode",{parentName:"h3"},"maintainers")),(0,o.kt)("p",null,"Github usernames of the people that maintain the package, they will be notified on PRs etc."),(0,o.kt)("h3",{id:"description"},(0,o.kt)("inlineCode",{parentName:"h3"},"description")),(0,o.kt)("p",null,"A description of the package and its intended usage"),(0,o.kt)("h3",{id:"transforms"},(0,o.kt)("inlineCode",{parentName:"h3"},"transforms")),(0,o.kt)("p",null,"A key value pair of transforms organized by semver-compatible versions."),(0,o.kt)("p",null,"For more information see ",(0,o.kt)("a",{parentName:"p",href:"guiding-principles#codemods-should-target-a-version-of-package"},"Guiding Principles"),"."),(0,o.kt)("h3",{id:"presets"},(0,o.kt)("inlineCode",{parentName:"h3"},"presets")),(0,o.kt)("p",null,"A key value pair of presets organized by kebab case identifiers."),(0,o.kt)("p",null,"Presets are intended to act as a way to share generic codemods, that are either completely generic or compliment the target package but are not version specific."),(0,o.kt)("p",null,"Some examples include: ",(0,o.kt)("inlineCode",{parentName:"p"},"sort-imports"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"format-props"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"remove-comments"),", etc."),(0,o.kt)("h3",{id:"targets"},(0,o.kt)("inlineCode",{parentName:"h3"},"targets")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Experimental")),(0,o.kt)("p",null,"Targets list the packages that the codemod package targets.\nThis is useful for Hypermod packages that have codemods targeting multiple related packages at the same time, such as packages from a monorepo."),(0,o.kt)("p",null,"For example: ",(0,o.kt)("inlineCode",{parentName:"p"},"targets: ['@foo/bar', '@foo/baz']")))}d.isMDXComponent=!0}}]);