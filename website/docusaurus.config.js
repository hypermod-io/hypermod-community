/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'CodeshiftCommunity',
  tagline: 'Codemods for everyone ✨',
  url: 'https://www.codeshiftcommunity.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'CodeshiftCommunity',
  projectName: 'CodeshiftCommunity',
  themeConfig: {
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
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/palenight'),
    },
    navbar: {
      title: 'CodeshiftCommunity',
      logo: {
        alt: 'CodeshiftCommunity Logo',
        src: 'img/logo.svg',
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
          type: 'doc',
          docId: 'codeshiftbot',
          label: 'CodeshiftBot',
          position: 'right',
        },
        {
          href: 'https://github.com/CodeshiftCommunity/CodeshiftCommunity',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
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
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/CodeshiftCommunity',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/CodeshiftCommunity',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/CodeshiftCommunity/CodeshiftCommunity',
            },
            {
              label: 'Roadmap',
              href: 'https://github.com/CodeshiftCommunity/CodeshiftCommunity/projects/1',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CodeshiftCommunity.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/CodeshiftCommunity/CodeshiftCommunity/edit/main/website/',
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
};
