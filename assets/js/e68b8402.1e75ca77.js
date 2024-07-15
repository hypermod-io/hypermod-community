"use strict";(self.webpackChunkcodeshift_community=self.webpackChunkcodeshift_community||[]).push([[3122],{2839:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>l,metadata:()=>d,toc:()=>t});var s=r(4848),i=r(8453);const l={id:"cli",title:"hypermod/cli",slug:"/cli"},o=void 0,d={id:"api/cli",title:"hypermod/cli",description:"To download and run codemods, we provide a CLI tool called @hypermod/cli.",source:"@site/docs/api/hypermod-cli.mdx",sourceDirName:"api",slug:"/cli",permalink:"/docs/cli",draft:!1,unlisted:!1,editUrl:"https://github.com/hypermod-io/hypermod-community/edit/main/website/docs/api/hypermod-cli.mdx",tags:[],version:"current",frontMatter:{id:"cli",title:"hypermod/cli",slug:"/cli"},sidebar:"api",next:{title:"hypermod/utils",permalink:"/docs/utils"}},c={},t=[{value:"Usage/Installation",id:"usageinstallation",level:2},{value:"default",id:"default",level:2},{value:"--transform, -t",id:"--transform--t",level:3},{value:"--packages",id:"--packages",level:3},{value:"--parser, -p",id:"--parser--p",level:3},{value:"--extensions, -e",id:"--extensions--e",level:3},{value:"--sequence, -s",id:"--sequence--s",level:3},{value:"--ignore-pattern",id:"--ignore-pattern",level:3},{value:"--verbose",id:"--verbose",level:3},{value:"--version, -v",id:"--version--v",level:3},{value:"--registry",id:"--registry",level:3},{value:"--registryToken",id:"--registrytoken",level:3},{value:"--help",id:"--help",level:3},{value:"list",id:"list",level:2},{value:"init",id:"init",level:2},{value:"--config-only (optional)",id:"--config-only-optional",level:3},{value:"--version (optional)",id:"--version-optional",level:3},{value:"--preset (optional)",id:"--preset-optional",level:3},{value:"validate",id:"validate",level:2}];function a(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:["To download and run codemods, we provide a CLI tool called ",(0,s.jsx)(n.code,{children:"@hypermod/cli"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"@hypermod/cli"})," is responsible for running the provided transform against your entire codebase.\nUnder the hood, it is a wrapper of jscodeshift's CLI, which provides additional functionality"]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"Ability to run community codemods hosted on npm"}),"\n",(0,s.jsx)(n.li,{children:"Runs versioned codemods in sequence"}),"\n",(0,s.jsx)(n.li,{children:"Always runs the latest version of a codemod"}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["The CLI allows you to run transforms either from the ",(0,s.jsx)(n.a,{href:"https://github.com/hypermod-io/hypermod-community/tree/main/community",children:"the public registry"})," or on your local machine as per the original implementation of jscodeshift"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Note:"})," Codemods will be designed to do the heavy lifting, but they'll often not be perfect so some manual work may still be required in order to successfully migrate."]}),"\n",(0,s.jsx)(n.h2,{id:"usageinstallation",children:"Usage/Installation"}),"\n",(0,s.jsxs)(n.p,{children:["We recommend running the CLI with ",(0,s.jsx)(n.code,{children:"$ npx"})," to ensure you always have the latest version."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"$ npx @hypermod/cli --packages mylib@1.0.0 /project/src"})}),"\n",(0,s.jsx)(n.p,{children:"But it can also be installed globally:"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"$ npm install -g @hypermod/cli"})," or ",(0,s.jsx)(n.code,{children:"yarn global add @hypermod/cli"})]}),"\n",(0,s.jsx)(n.p,{children:"and run with:"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"$ hypermod"})," or ",(0,s.jsx)(n.code,{children:"$ hypermod-cli"})]}),"\n",(0,s.jsx)(n.h2,{id:"default",children:"default"}),"\n",(0,s.jsx)(n.p,{children:"The default CLI command (when no subcommand is specified,) will attempt to download and run transform(s) against the specified file path."}),"\n",(0,s.jsxs)(n.p,{children:["In the majority of cases you want to be sure to either provide the ",(0,s.jsx)(n.code,{children:"--packages"})," flag for running remote codemods, or the ",(0,s.jsx)(n.code,{children:"--transform, -t"})," flag to run a local transform file."]}),"\n",(0,s.jsxs)(n.p,{children:["For running codemods as an end-user it's recommend to use the ",(0,s.jsx)(n.code,{children:"--packages"})," flag, which accepts the following format: ",(0,s.jsx)(n.code,{children:"--packages [package-name]@[semver-version]"}),". For example, running the codemod to migrate your codebase to ",(0,s.jsx)(n.code,{children:"react"})," version ",(0,s.jsx)(n.code,{children:"18.0.0"})," you would specify the following ",(0,s.jsx)(n.code,{children:"--packages react@18.0.0"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:['In special cases, Hypermod package authors may choose to also expose codemod "presets", which can be considered as utility codemods for that package. Presets are also run via the ',(0,s.jsx)(n.code,{children:"--packages"})," flag like so: ",(0,s.jsx)(n.code,{children:"--packages react#remove-spread-props"}),".\nNotice that we have switched to a hash ",(0,s.jsx)(n.code,{children:"#"})," here to denote that we want to run a preset."]}),"\n",(0,s.jsxs)(n.p,{children:["Hypermod will then attempt to locate codemods from both ",(0,s.jsx)(n.a,{href:"https://github.com/hypermod-io/hypermod-community/tree/main/community",children:"the public registry"})," and the primary npm package ie ",(0,s.jsx)(n.a,{href:"https://www.npmjs.com/package/react",children:"React \u2013 NPM"}),".\n(Note: Some packages wont have any codemods, you can use the ",(0,s.jsx)(n.a,{href:"#list",children:"list"})," subcommand to check if they exist.)"]}),"\n",(0,s.jsxs)(n.p,{children:["Lastly, when authoring a package, it's possible to test your transforms by omitting both the ",(0,s.jsx)(n.code,{children:"--packages"})," and ",(0,s.jsx)(n.code,{children:"--transform"})," flags. In this interactive mode, the ",(0,s.jsx)(n.code,{children:"hypermod/cli"})," will attempt to locate\na local ",(0,s.jsx)(n.code,{children:"hypermod.config.js"})," from the current or parent directories and present an interactive prompt for you to choose from."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsx)(n.p,{children:'Run a transform for "@mylib/button" version 3.0.0 only'}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod --packages @mylib/button@3.0.0 /project/src"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:['Run a transform for "@mylib/button" preset ',(0,s.jsx)(n.code,{children:"foo-bar"})," only"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod --packages @mylib/button#foo-bar /project/src"})}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:'Run all transforms for "@mylib/button" greater than version 3.0.0 and @mylib/range greater than 4.0.0'}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod --sequence --packages @mylib/button@3.0.0,@mylib/range@4.0.0 /project/src"})}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:'Run the "my-custom-transform" transform'}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod -t path/to/my-custom-transform /project/src"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Display a prompt with a list of codemods from my local ",(0,s.jsx)(n.code,{children:"hypermod.config.js"})," file(s)."]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod /project/src"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"--transform--t",children:"--transform, -t"}),"\n",(0,s.jsx)(n.p,{children:"Allows you to execute local transform file(s)."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Can be provided with a comma-separated list (see example below)."}),"\n",(0,s.jsx)(n.li,{children:'Transforms can be either a single file or directory containing an "index" file.'}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod --transform codemods/my-special-mod /project/src/file.js"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod --transform codemods/my-special-mod/index.ts /project/src/file.js"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod --transform path/to/transform1.ts,path/to/transform2.ts,path/to/transform3.ts /project/src/file.js"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"--packages",children:"--packages"}),"\n",(0,s.jsx)(n.p,{children:"Runs transforms for the specified comma separated list of packages, optionally include a version for each package to run all transforms since that version"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod --packages @atlaskit/button /project/src"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod --packages @atlaskit/button@3.0.0,@atlaskit/range@4.0.0 /project/src"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"--parser--p",children:"--parser, -p"}),"\n",(0,s.jsx)(n.p,{children:"Parser to use for parsing the source files you are code modding."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"options:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"babel"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"babylon"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"flow"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"ts"})}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"tsx"})," (default)"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"default:"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"tsx"})}),"\n",(0,s.jsx)(n.p,{children:"tsx is a superset of JavaScript + JSX and should be the most sensible default for modern codebases."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod --parser tsx /project/src/file.ts"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod -p babel /project/src/file.js"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"--extensions--e",children:"--extensions, -e"}),"\n",(0,s.jsx)(n.p,{children:"Transform files with these file extensions (comma separated list)."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"default:"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"js, jsx, ts, tsx"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod --extensions ts,tsx /project/src/file.js"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod -e js /project/src/file.js"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"--sequence--s",children:"--sequence, -s"}),"\n",(0,s.jsx)(n.p,{children:"If the package flag is provided, runs all transforms from the provided version to the latest."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"default:"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"false"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod --packages @atlaskit/button@3.0.0 --sequence /project/src"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"--ignore-pattern",children:"--ignore-pattern"}),"\n",(0,s.jsx)(n.p,{children:"Ignore files that match a provided glob expression"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"default:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"**/node_modules/**"})}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod --ignore-pattern node_modules /project/src/file.js"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"--verbose",children:"--verbose"}),"\n",(0,s.jsx)(n.p,{children:"Show more information about the transform process"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"default:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"0"})}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod --verbose 2 /project/src/file.js"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"--version--v",children:"--version, -v"}),"\n",(0,s.jsx)(n.p,{children:"Get current version number"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod --version"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod -v"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"--registry",children:"--registry"}),"\n",(0,s.jsx)(n.p,{children:"If an alternative registry url is provided, all packages will be fetched from this registry."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"default:"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"https://registry.npmjs.org/"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod --registry https://private-registry.npmjs.org/"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"--registrytoken",children:"--registryToken"}),"\n",(0,s.jsx)(n.p,{children:"If a registry token is provided, it will be used as an authentication token for the registry."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod --registryToken <ACCESS_TOKEN>"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"--help",children:"--help"}),"\n",(0,s.jsx)(n.p,{children:"Print all help text to the command line"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod --help"})}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"list",children:"list"}),"\n",(0,s.jsx)(n.p,{children:"Subcommand that lists available codemods for the provided packages"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsx)(n.p,{children:"Print a list of available codemods for a single package"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod list mylib"})}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Print a list of available codemods for multiple packages"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod list @atlaskit/avatar @emotion/monorepo"})}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"init",children:"init"}),"\n",(0,s.jsx)(n.p,{children:"Subcommand that generates a new codemod at your desired path"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsx)(n.p,{children:"Create a new Hypermod package called foobar with a transform for version 10\non the Desktop"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:'$ hypermod init --version="10.0.0" ~/Desktop/foobar'})}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Create an empty hypermod package called on the Desktop"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod init ~/Desktop/foobar"})}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Create an empty hypermod package called foobar in the current directory"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod init"})}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Create a 'config only' hypermod package in the current directory"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod init --config-only ."})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"--config-only-optional",children:"--config-only (optional)"}),"\n",(0,s.jsx)(n.p,{children:"Only output a configuration file."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsx)(n.p,{children:"Initializes a configuration file only"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"`$ hypermod init --config-only path/to/src``"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Initializes a configuration file and preset source code"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"`$ hypermod init --config-only --preset update-imports path/to/src``"}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"--version-optional",children:"--version (optional)"}),"\n",(0,s.jsx)(n.p,{children:"A semver-compatible string. Will be used to generate mock transform files and configuration."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsx)(n.p,{children:"Create a codemod package called foobar with a versioned transform."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:'$ hypermod init --package-name="foobar" --version="10.0.0" ~/Desktop'})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"--preset-optional",children:"--preset (optional)"}),"\n",(0,s.jsx)(n.p,{children:"A kebab-cased string. Will be used to generate mock transform files and configuration."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsx)(n.p,{children:"Create a codemod package called foobar with a preset."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:'$ hypermod init --package-name="foobar" --preset="sort-imports" ~/Desktop'})}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"validate",children:"validate"}),"\n",(0,s.jsx)(n.p,{children:"Subcommand that validates a codemod package at the desired path."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"example:"})}),"\n",(0,s.jsx)(n.p,{children:'Validate a codemod package called "my-codemods".'}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod validate ./codemods/my-codemods"})}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Validate a codemod package from the current working directory"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$ hypermod validate"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>o,x:()=>d});var s=r(6540);const i={},l=s.createContext(i);function o(e){const n=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);