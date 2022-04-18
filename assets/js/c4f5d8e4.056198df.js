"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[4195],{8066:function(e,t,n){n.d(t,{Z:function(){return S}});var a=n(3117),r=n(7294),l=n(6010),o={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","at-rule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]},c={Prism:n(7410).default,theme:o};function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},i.apply(this,arguments)}var m=/\r\n|\r|\n/,h=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},u=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},v=function(e,t){var n=e.plain,a=Object.create(null),r=e.styles.reduce((function(e,n){var a=n.languages,r=n.style;return a&&!a.includes(t)||n.types.forEach((function(t){var n=i({},e[t],r);e[t]=n})),e}),a);return r.root=n,r.plain=i({},n,{backgroundColor:null}),r};function d(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===t.indexOf(a)&&(n[a]=e[a]);return n}var p=function(e){function t(){for(var t=this,n=[],a=arguments.length;a--;)n[a]=arguments[a];e.apply(this,n),s(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?v(e.theme,e.language):void 0;return t.themeDict=n})),s(this,"getLineProps",(function(e){var n=e.key,a=e.className,r=e.style,l=i({},d(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),o=t.getThemeDict(t.props);return void 0!==o&&(l.style=o.plain),void 0!==r&&(l.style=void 0!==l.style?i({},l.style,r):r),void 0!==n&&(l.key=n),a&&(l.className+=" "+a),l})),s(this,"getStyleForToken",(function(e){var n=e.types,a=e.empty,r=n.length,l=t.getThemeDict(t.props);if(void 0!==l){if(1===r&&"plain"===n[0])return a?{display:"inline-block"}:void 0;if(1===r&&!a)return l[n[0]];var o=a?{display:"inline-block"}:{},c=n.map((function(e){return l[e]}));return Object.assign.apply(Object,[o].concat(c))}})),s(this,"getTokenProps",(function(e){var n=e.key,a=e.className,r=e.style,l=e.token,o=i({},d(e,["key","className","style","token"]),{className:"token "+l.types.join(" "),children:l.content,style:t.getStyleForToken(l),key:void 0});return void 0!==r&&(o.style=void 0!==o.style?i({},o.style,r):r),void 0!==n&&(o.key=n),a&&(o.className+=" "+a),o})),s(this,"tokenize",(function(e,t,n,a){var r={code:t,grammar:n,language:a,tokens:[]};e.hooks.run("before-tokenize",r);var l=r.tokens=e.tokenize(r.code,r.grammar,r.language);return e.hooks.run("after-tokenize",r),l}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,a=e.code,r=e.children,l=this.getThemeDict(this.props),o=t.languages[n];return r({tokens:function(e){for(var t=[[]],n=[e],a=[0],r=[e.length],l=0,o=0,c=[],s=[c];o>-1;){for(;(l=a[o]++)<r[o];){var i=void 0,v=t[o],d=n[o][l];if("string"==typeof d?(v=o>0?v:["plain"],i=d):(v=u(v,d.type),d.alias&&(v=u(v,d.alias)),i=d.content),"string"==typeof i){var p=i.split(m),g=p.length;c.push({types:v,content:p[0]});for(var y=1;y<g;y++)h(c),s.push(c=[]),c.push({types:v,content:p[y]})}else o++,t.push(v),n.push(i),a.push(0),r.push(i.length)}o--,t.pop(),n.pop(),a.pop(),r.pop()}return h(c),s}(void 0!==o?this.tokenize(t,a,o,n):[a]),className:"prism-code language-"+n,style:void 0!==l?l.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(r.Component),g=p,y=n(9575);var f=n(5999),E="copyButton_eDfN",b="copyButtonCopied_ljy5",Z="copyButtonIcons_W9eQ",N="copyButtonIcon_XEyF",k="copyButtonSuccessIcon_i9w9";function C(e){var t=e.code,n=(0,r.useState)(!1),a=n[0],o=n[1],c=(0,r.useRef)(void 0),s=(0,r.useCallback)((function(){!function(e,t){var n=(void 0===t?{}:t).target,a=void 0===n?document.body:n,r=document.createElement("textarea"),l=document.activeElement;r.value=e,r.setAttribute("readonly",""),r.style.contain="strict",r.style.position="absolute",r.style.left="-9999px",r.style.fontSize="12pt";var o=document.getSelection(),c=!1;o.rangeCount>0&&(c=o.getRangeAt(0)),a.append(r),r.select(),r.selectionStart=0,r.selectionEnd=e.length;var s=!1;try{s=document.execCommand("copy")}catch(i){}r.remove(),c&&(o.removeAllRanges(),o.addRange(c)),l&&l.focus()}(t),o(!0),c.current=window.setTimeout((function(){o(!1)}),1e3)}),[t]);return(0,r.useEffect)((function(){return function(){return window.clearTimeout(c.current)}}),[]),r.createElement("button",{type:"button","aria-label":a?(0,f.I)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,f.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,f.I)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,l.Z)(E,"clean-btn",a&&b),onClick:s},r.createElement("span",{className:Z,"aria-hidden":"true"},r.createElement("svg",{className:N,viewBox:"0 0 24 24"},r.createElement("path",{d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})),r.createElement("svg",{className:k,viewBox:"0 0 24 24"},r.createElement("path",{d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"}))))}var H="codeBlockContainer_I0IT",B="codeBlockContent_wNvx",w="codeBlockTitle_BvAR",V="codeBlock_jd64",_="codeBlockStandalone_csWH",I="codeBlockLines_mRuA";function S(e){var t,n=e.children,o=e.className,s=void 0===o?"":o,i=e.metastring,m=e.title,h=e.language,u=(0,y.LU)().prism,v=(0,r.useState)(!1),d=v[0],p=v[1];(0,r.useEffect)((function(){p(!0)}),[]);var f=(0,y.bc)(i)||m,E=(0,y.pJ)();if(r.Children.toArray(n).some((function(e){return(0,r.isValidElement)(e)})))return r.createElement(g,(0,a.Z)({},c,{key:String(d),theme:E,code:"",language:"text"}),(function(e){var t=e.className,a=e.style;return r.createElement("pre",{tabIndex:0,className:(0,l.Z)(t,_,"thin-scrollbar",H,s,y.kM.common.codeBlock),style:a},r.createElement("code",{className:I},n))}));var b=Array.isArray(n)?n.join(""):n,Z=null!=(t=null!=h?h:(0,y.Vo)(s))?t:u.defaultLanguage,N=(0,y.nZ)(b,i,Z),k=N.highlightLines,S=N.code;return r.createElement(g,(0,a.Z)({},c,{key:String(d),theme:E,code:S,language:null!=Z?Z:"text"}),(function(e){var t,n=e.className,o=e.style,c=e.tokens,i=e.getLineProps,m=e.getTokenProps;return r.createElement("div",{className:(0,l.Z)(H,s,(t={},t["language-"+Z]=Z&&!s.includes("language-"+Z),t),y.kM.common.codeBlock)},f&&r.createElement("div",{style:o,className:w},f),r.createElement("div",{className:B,style:o},r.createElement("pre",{tabIndex:0,className:(0,l.Z)(n,V,"thin-scrollbar")},r.createElement("code",{className:I},c.map((function(e,t){1===e.length&&"\n"===e[0].content&&(e[0].content="");var n=i({line:e,key:t});return k.includes(t)&&(n.className+=" docusaurus-highlight-code-line"),r.createElement("span",(0,a.Z)({key:t},n),e.map((function(e,t){return r.createElement("span",(0,a.Z)({key:t},m({token:e,key:t})))})),r.createElement("br",null))})))),r.createElement(C,{code:S})))}))}},9427:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var a,r=n(7294),l=n(6010),o=n(8066),c=n(2600),s=n(9960),i=n(4996),m=n(2263),h={landingContent:"landingContent_Fal6",navbar:"navbar_VsZD",valueContainer:"valueContainer_chiT",valueContainerIcon:"valueContainerIcon_pa99",heroImage:"heroImage_ba0c",heroBanner:"heroBanner_UJJx",heroHeadingBanner:"heroHeadingBanner_FKRq",heroHeadingSecondary:"heroHeadingSecondary_l8Vy",logoBanner:"logoBanner_Nt65",bannerButton:"bannerButton_MlNc",heroSection:"heroSection_dXSz",heroContainer:"heroContainer_YhLz",heroList:"heroList_t5HD",container:"container_czXe",containerLarge:"containerLarge_Sn9a",containerCenter:"containerCenter_MeGl",featureImage:"featureImage_yA8i",lozenge:"lozenge_PU8_",center:"center_migW"},u=["title","titleId"];function v(){return v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},v.apply(this,arguments)}function d(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=function(e){var t=e.title,n=e.titleId,l=d(e,u);return r.createElement("svg",v({width:37,viewBox:"0 0 37 21",xmlns:"http://www.w3.org/2000/svg","aria-labelledby":n},l),t?r.createElement("title",{id:n},t):null,a||(a=r.createElement("g",{fillRule:"nonzero",fill:"none"},r.createElement("path",{d:"M21 4v11h-2V1h-1V0h12v1h1v3H21Z",fill:"#2C333A"}),r.createElement("path",{d:"M8 11v-1H7V9H6V8H5V7H4V6H3V4h1V3h1V2h3v1h1v1h1V3h1V2h3v1h1v1h1v2h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1H9v-1H8ZM7 3H6v1h1v1h1V4H7V3Zm6 0h-1v1h1v1h1V4h-1V3Z",fill:"#EF5350"}),r.createElement("path",{d:"M19 15h-8v-1H6v1H0V0h18v1h1v14ZM8 2H5v1H4v1H3v2h1v1h1v1h1v1h1v1h1v1h1v1h1v-1h1v-1h1V9h1V8h1V7h1V6h1V4h-1V3h-1V2h-3v1h-1v1H9V3H8V2Z",fill:"#3E4751"}),r.createElement("path",{d:"M8 4v1H7V4h1Zm6 0v1h-1V4h1ZM7 3v1H6V3h1Zm6 0v1h-1V3h1Z",fill:"#FFF"}),r.createElement("path",{d:"M5 15v2H2v-2h3Zm17 2H12v-2h9V4h7v1h1v2h-1v4h-1V7h-4v4h3v1h2v-1h2v1h1v1h-1v4h-1v-2h-1v-1h-5v1h-1v2Z",fill:"#673AB7"}),r.createElement("path",{d:"M36 15h-4v-2h-1v-1h-1v-1h6v1h1v1h-1v2Zm-8-4v1h-2v-1h2Zm5-7v1h1v2h-5V5h-1V4h5Z",fill:"#8963CF"}),r.createElement("path",{d:"M27 11h-4V7h4v4ZM28 7h1v4h-1V7Z",fill:"#9EBBDE"}),r.createElement("path",{d:"M35 11h-6V7h5v2h1v2Z",fill:"#CAD7E6"}),r.createElement("path",{d:"M28 19v-3h-1v-1h-3v1h-1v3H11v-3h-1v-1H7v1H6v3H3v-1H2v-1h3v-2h1v-1h5v1h1v2h10v-2h1v-1h5v1h1v2h1v-4h1v5h-1v1h-2Z",fill:"#9EBBDE"}),r.createElement("path",{d:"M30 19v-1h1v-5h1v2h4v-2h1v5h-1v1h-6Z",fill:"#CAD7E6"}),r.createElement("path",{d:"M7 21v-1H6v-4h1v-1h2v1h1v4H9v1H7Zm2-4H7v2h2v-2Z",fill:"#3E4751"}),r.createElement("path",{d:"M11 16v3h1v1h-1v1H9v-1h1v-4h1Zm7 3v1h-1v1h-3v-1h-1v-1h5Zm10-3v3h1v1h-1v1h-2v-1h1v-4h1Zm3 5v-1h-1v-1h5v1h-1v1h-3Zm-21-6v1H9v-1h1Zm17 0v1h-1v-1h1Z",fill:"#2C333A"}),r.createElement("path",{d:"M24 21v-1h-1v-4h1v-1h2v1h1v4h-1v1h-2Zm2-4h-2v2h2v-2Z",fill:"#3E4751"}),r.createElement("path",{d:"M9 19H7v-2h2v2ZM26 19h-2v-2h2v2Z",fill:"#C8E0FF"}))))};n(2389),n(9575);function g(){var e=(0,m.Z)().siteConfig,t=void 0===e?{}:e;return r.createElement(c.Z,{title:t.title,description:"Write, test, publish and consume codemods in a structured, standardized and familiar way."},r.createElement("header",{className:(0,l.Z)(h.heroBanner)},r.createElement("div",{className:(0,l.Z)(h.container,h.heroContainer)},r.createElement("h1",{className:(0,l.Z)(h.heroHeadingBanner)},"The community-owned codemod registry."),r.createElement("p",{className:"hero__subtitle"},"Write, test, publish and consume codemods in a structured, standardized and familiar way."),r.createElement("p",null),r.createElement(s.Z,{to:(0,i.Z)("docs/"),className:(0,l.Z)("button button--primary button--lg",h.bannerButton)},"Read the docs"))),r.createElement("main",{className:(0,l.Z)(h.landingContent)},r.createElement("section",{className:(0,l.Z)(h.heroSection,h.features)},r.createElement("div",{className:(0,l.Z)(h.container,h.containerLarge)},r.createElement("div",{className:"row"},r.createElement("div",{className:(0,l.Z)("col col--3")},r.createElement("div",{className:(0,l.Z)(h.valueContainer)},r.createElement("span",{role:"img","aria-label":"truck",className:(0,l.Z)(h.valueContainerIcon)},"\ud83c\udf81")," ",r.createElement("h3",null,"Publish"),r.createElement("p",null,"Create, test and publish your own codemods for your users"))),r.createElement("div",{className:(0,l.Z)("col col--3")},r.createElement("div",{className:(0,l.Z)(h.valueContainer)},r.createElement("span",{role:"img","aria-label":"book",className:(0,l.Z)(h.valueContainerIcon)},"\ud83c\udf31")," ",r.createElement("h3",null,"Up-skill"),r.createElement("p",null,"Up-skill your engineering team using our guides & resources"))),r.createElement("div",{className:(0,l.Z)("col col--3")},r.createElement("div",{className:(0,l.Z)(h.valueContainer)},r.createElement("span",{role:"img","aria-label":"bolt",className:(0,l.Z)(h.valueContainerIcon)},"\u26a1\ufe0f")," ",r.createElement("h3",null,"Go fast"),r.createElement("p",null,"Use our helpers & testing utilities to make writing codemods a breeze"))),r.createElement("div",{className:(0,l.Z)("col col--3")},r.createElement("div",{className:(0,l.Z)(h.valueContainer)},r.createElement("span",{role:"img","aria-label":"telescope",className:(0,l.Z)(h.valueContainerIcon)},"\ud83d\udd2d")," ",r.createElement("h3",null,"Registry"),r.createElement("p",null,"Explore an extensive list of codemods contributed by the community")))))),r.createElement("section",{className:(0,l.Z)(h.heroSection)},r.createElement("div",{className:(0,l.Z)(h.container,h.heroContainer,h.containerCenter)},r.createElement("h2",{className:(0,l.Z)(h.heroHeadingBanner)},"Bring users with you."),r.createElement("p",null,"Don't let APIs of the past hold you back. Give users the tools they need to upgrade across major versions by creating version-targetted codemods.")),r.createElement("div",{className:(0,l.Z)(h.container,h.containerLarge)},r.createElement("div",{className:"row"},r.createElement("div",{className:(0,l.Z)("col col--4")},r.createElement(o.Z,{className:"language-diff"},"+import Button from '@my-lib/button';\n\n\n+const App = () => (\n+  <Button\n+    appearance=\"bold\"\n+    handleClick=()\n+  >\n+    Submit\n+  </Button>\n+);"),r.createElement("div",{className:(0,l.Z)(h.center)},r.createElement("span",{className:(0,l.Z)(h.lozenge)},"v1.0.0"))),r.createElement("div",{className:(0,l.Z)("col col--4")},r.createElement(o.Z,{className:"language-diff"},"-import Button from '@my-lib/button';\n+import Button from '@foobar/button';\n\n\nconst App = () => (\n  <Button\n    appearance=\"bold\"\n-    handleClick=()\n+    onClick=()\n  >\n    Submit\n  </Button>\n);"),r.createElement("div",{className:(0,l.Z)(h.center)},r.createElement("span",{className:(0,l.Z)(h.lozenge)},"v2.0.0"))),r.createElement("div",{className:(0,l.Z)("col col--4")},r.createElement(o.Z,{className:"language-diff"},'import Button from \'@foobar/button\';\n\nconst App = () => (\n  <Button\n-   appearance="bold"\n+   appearance="primary"\n    onClick=()\n  >\n    Submit\n  </Button>\n);'),r.createElement("div",{className:(0,l.Z)(h.center)},r.createElement("span",{className:(0,l.Z)(h.lozenge)},"v3.0.0")))))),r.createElement("section",{className:(0,l.Z)(h.heroSection)},r.createElement("div",{className:(0,l.Z)(h.container,h.containerLarge)},r.createElement("h2",{className:(0,l.Z)(h.heroHeadingBanner)},"How it works"),r.createElement("ol",{className:(0,l.Z)(h.heroList)},r.createElement("li",null,r.createElement("div",{className:"row"},r.createElement("div",{className:"col col--4"},r.createElement("h3",{className:(0,l.Z)(h.heroHeadingSecondary)},"1. Initialize your project"),r.createElement("p",null,"Instantly create a brand new codeshift package that can be run from anywhere.")),r.createElement("div",{className:"col col--8"},r.createElement(o.Z,{className:"language-bash"},"$ codeshift init --packageName foobar")))),r.createElement("li",null,r.createElement("div",{className:"row"},r.createElement("div",{className:"col col--4"},r.createElement("h3",{className:(0,l.Z)(h.heroHeadingSecondary)},"2. Create a config"),r.createElement("p",null,"Label and organise your codemods."),r.createElement("ul",null,r.createElement("li",null,r.createElement("strong",null,"Transforms:")," codemods that modify package across multiple versions"),r.createElement("li",null,r.createElement("strong",null,"Presets:")," Utility codemods that support the use of a package"))),r.createElement("div",{className:"col col--8"},r.createElement(o.Z,{className:"language-js"},"export.module = {\n  transforms: {\n    '12.0.0': require.resolve('./18.0.0/transform'),\n    '13.0.0': require.resolve('./19.0.0/transform'),\n  },\n  presets: {\n    'format-imports': require.resolve('./format-imports/transform')\n  }\n};")))),r.createElement("li",null,r.createElement("div",{className:"row"},r.createElement("div",{className:"col col--4"},r.createElement("h3",{className:(0,l.Z)(h.heroHeadingSecondary)},"3. Write your codemod"),r.createElement("p",null,"Painlessly author your codemod using our delightful library of utilities and documentation.")),r.createElement("div",{className:"col col--8"},r.createElement(o.Z,{className:"language-js"},"import {\n  hasImportDeclaration,\n  renameImportDeclaration,\n} from '@codeshift/utils';\n\nfunction transformer(file, { jscodeshift: j }) {\n  const source = j(file.source);\n  const oldImport = 'bar';\n  const newImport = 'foobar';\n\n  if (!hasImportDeclaration(j, source, oldImport)) {\n    return file.source;\n  }\n\n  renameImportDeclaration(j, source, oldImport, newImport),\n\n  return source.toSource();\n}\n\nexport default transformer;")))),r.createElement("li",null,r.createElement("div",{className:"row"},r.createElement("div",{className:"col col--4"},r.createElement("h3",{className:(0,l.Z)(h.heroHeadingSecondary)},"4. Publish"),r.createElement("p",null,"With a single command, share your codemods with the world. No need to create a bespoke CLI client.")),r.createElement("div",{className:"col col--8"},r.createElement(o.Z,{className:"language-bash"},"$ npm publish")))),r.createElement("li",null,r.createElement("div",{className:"row"},r.createElement("div",{className:"col col--4"},r.createElement("h3",{className:(0,l.Z)(h.heroHeadingSecondary)},"5. Run"),r.createElement("p",null,"Give your consumers a single API to keep their code up to date with the latest and greatest.")),r.createElement("div",{className:"col col--8"},r.createElement(o.Z,{className:"language-bash"},"$ codeshift -p foobar@12.0.0 path/to/src"))))))),r.createElement("section",{className:(0,l.Z)(h.heroSection)},r.createElement("div",{className:(0,l.Z)(h.container,h.containerCenter)},r.createElement("h2",{className:(0,l.Z)(h.heroHeadingBanner)},"Help make the JS ecosystem a better place."),r.createElement("p",null,"CodeshiftCommunity exists to make dependency management feel less of a juggling act. But it's a team effort..."),r.createElement("div",{className:h.buttons},r.createElement(s.Z,{to:(0,i.Z)("docs/"),className:(0,l.Z)("button button--primary button--lg")},"Join our community!")))),r.createElement("section",{className:(0,l.Z)(h.logoBanner)},r.createElement("div",{className:(0,l.Z)(h.containerCenter)},r.createElement(p,{title:"CodeshiftCommunity logo",style:{maxWidth:"160px",width:"100%"}})))))}}}]);