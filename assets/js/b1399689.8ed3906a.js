"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[9832],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=s(n),f=a,m=d["".concat(c,".").concat(f)]||d[f]||u[f]||i;return n?r.createElement(m,o(o({ref:t},p),{},{components:n})):r.createElement(m,o({ref:t},p))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4093:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return l},metadata:function(){return s},toc:function(){return u}});var r=n(3117),a=n(102),i=(n(7294),n(3905)),o=["components"],l={id:"external-packages",title:"External Packages",slug:"/external-packages"},c=void 0,s={unversionedId:"external-packages",id:"external-packages",title:"External Packages",description:"This page covers creation of stand-alone codeshift packages and is for authors who want:",source:"@site/docs/external-packages.mdx",sourceDirName:".",slug:"/external-packages",permalink:"/docs/external-packages",editUrl:"https://github.com/CodeshiftCommunity/CodeshiftCommunity/edit/main/website/docs/external-packages.mdx",tags:[],version:"current",frontMatter:{id:"external-packages",title:"External Packages",slug:"/external-packages"},sidebar:"docs",previous:{title:"Contribution",permalink:"/docs/contribution"},next:{title:"Your first codemod",permalink:"/docs/your-first-codemod"}},p={},u=[{value:"Initializing",id:"initializing",level:2},{value:"File structure",id:"file-structure",level:3},{value:"Testing",id:"testing",level:2},{value:"Publishing",id:"publishing",level:2}],d={toc:u};function f(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"This page covers creation of stand-alone codeshift packages and is for authors who want:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Control over where and how your codeshift package is hosted"),(0,i.kt)("li",{parentName:"ul"},"Control over tooling, dependencies and techstack"),(0,i.kt)("li",{parentName:"ul"},"The option to create completely generic codemods that don't target specific packages")),(0,i.kt)("p",null,"If you prefer to not to maintain a separate package, please see the ",(0,i.kt)("a",{parentName:"p",href:"authoring"},"Authoring guide")," for other options."),(0,i.kt)("h2",{id:"initializing"},"Initializing"),(0,i.kt)("p",null,"To create a standalone codeshift package automatically, install the install and use the ",(0,i.kt)("inlineCode",{parentName:"p"},"codeshift/cli"),"."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"npm:")," ",(0,i.kt)("inlineCode",{parentName:"li"},"npm install -g @codeshift/cli")," or"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"yarn:")," ",(0,i.kt)("inlineCode",{parentName:"li"},"yarn global add @codeshift/cli"))),(0,i.kt)("p",null,'Then given you want to initialize a new project called "foobar", with a codemod targetting version ',(0,i.kt)("inlineCode",{parentName:"p"},"10.0.0")," you can run the following command:"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},'$ codeshift init --package-name="foobar" --version="10.0.0" ~/Desktop')),(0,i.kt)("p",null,'This will create a new directory called "foobar" in the ',(0,i.kt)("inlineCode",{parentName:"p"},"~/Desktop")," directory."),(0,i.kt)("p",null,"You can then also initialize subsequent transforms and presets by running the command again:"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},'$ codeshift init --package-name="foobar" --preset="sort-imports" ~/Desktop')),(0,i.kt)("h3",{id:"file-structure"},"File structure"),(0,i.kt)("p",null,"The file structure of your new codeshift package will look like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"react-cool-library/\n  codeshift.config.js // main entrypoint containing configuration and references to your transforms\n  package.json\n  tsconfig.json\n  jest.config.js\n  src/\n    10.0.0/ // semver version\n      transform.ts // main logic (should contain a transformer)\n      transform.spec.ts // main tests\n      motions/ // utility directory\n")),(0,i.kt)("h2",{id:"testing"},"Testing"),(0,i.kt)("p",null,"Now to test your transformer, run ",(0,i.kt)("inlineCode",{parentName:"p"},"yarn test --watch"),"."),(0,i.kt)("p",null,"See the ",(0,i.kt)("a",{parentName:"p",href:"testing"},"Testing guide")," for help getting started with unit tests."),(0,i.kt)("h2",{id:"publishing"},"Publishing"),(0,i.kt)("p",null,"Since your new codeshift package can simply be treated as an NPM package you can simply run ",(0,i.kt)("inlineCode",{parentName:"p"},"npm version [patch\\minor\\major]")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"npm publish"),"."),(0,i.kt)("p",null,"Your package will now be accessible via the ",(0,i.kt)("inlineCode",{parentName:"p"},"codeshift/cli"),". Refer to the ",(0,i.kt)("a",{parentName:"p",href:"consuming"},"Consuming guide")," for information about how to run your new codemods."))}f.isMDXComponent=!0}}]);