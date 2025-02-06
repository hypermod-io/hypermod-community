/** @type {import('@docusaurus/types').DocusaurusConfig} */

const { themes } = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.palenight;

module.exports = {
  title: 'Hypermod Community',
  tagline: 'Codemods for everyone ✨',
  url: 'https://hypermod-io.github.io/',
  baseUrl: '/hypermod-community/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'hypermod-io',
  projectName: 'hypermod-community',
  trailingSlash: false,
  themeConfig: {
    defaultMode: 'light',
    disableSwitch: true,
    respectPrefersColorScheme: false,
    image: 'img/TwitterBanner.png',
    metadata: [
      {
        name: 'twitter:card',
        content:
          'Discover the power of codemods for your development workflow. Our tools and resources allow you to easily manage dependencies, automate refactoring, and transform your codebase. With support for code migration and evolution, you can modernize your code and keep it up-to-date with the latest best practices. Try our tools today and improve your development process.',
      },
      {
        name: 'og:description',
        content:
          'Discover the power of codemods for your development workflow. Our tools and resources allow you to easily manage dependencies, automate refactoring, and transform your codebase. With support for code migration and evolution, you can modernize your code and keep it up-to-date with the latest best practices. Try our tools today and improve your development process.',
      },
      {
        name: 'keywords',
        content:
          'codemods, code migration, code evolution, dependency management, automated refactoring, code transformation, development tools, code modernization, source code modification',
      },
    ],
    prism: {
      theme: lightTheme,
      darkTheme: darkTheme,
    },
    navbar: {
      title: 'Hypermod Community',
      logo: {
        alt: 'Hypermod Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo_dark.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'introduction',
          label: 'Docs',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'api/cli',
          label: 'API',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'registry',
          label: 'Registry',
          position: 'left',
        },
        {
          href: 'https://github.com/hypermod-io/hypermod-community',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/',
            },
            {
              label: 'Your first codemod',
              to: 'docs/your-first-codemod',
            },
            {
              label: 'Authoring',
              to: 'docs/authoring',
            },
            {
              label: 'Consuming',
              to: 'docs/consuming',
            },
            {
              label: 'Testing',
              to: 'docs/testing',
            },
            {
              label: 'Publishing & contribution',
              to: 'docs/contribution',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/XGqmKNZ8Rk',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/hypermod-io/hypermod-community/discussions',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/hypermod',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/hypermodio',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Hypermod GPT',
              href: 'https://chat.openai.com/g/g-RK2euIGZ5-hypermod-gpt',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/hypermod-io/hypermod-community',
            },
            {
              label: 'Roadmap',
              href: 'https://github.com/hypermod-io/hypermod-community/projects/1',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Hypermod.io`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/hypermod-io/hypermod-community/edit/main/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-X9RMY7JDM0',
          anonymizeIP: true,
        },
      },
    ],
  ],
  scripts: [
    {
      src: 'https://cdn.splitbee.io/sb.js',
      async: true,
    },
  ],
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: ['/'],
            to: 'https://www.hypermod.io/',
          },
          {
            from: ['/docs'],
            to: 'https://www.hypermod.io/docs',
          },
          {
            from: ['/docs/your-first-codemod'],
            to: 'https://www.hypermod.io/docs/guides/your-first-codemod',
          },
          {
            from: ['/docs/understanding-asts'],
            to: 'https://www.hypermod.io/docs/guides/understanding-asts',
          },
          {
            from: ['/docs/import-manipulation'],
            to: 'https://www.hypermod.io/docs/guides/import-manipulation',
          },
          {
            from: ['/docs/react'],
            to: 'https://www.hypermod.io/docs/guides/react-jsx',
          },
          {
            from: ['/docs/typescript'],
            to: 'https://www.hypermod.io/docs/guides/typescript',
          },
        ],
      },
    ],
  ],
};
