/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'CodeshiftCommunity',
  tagline: 'Codemods for everyone ✨',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'CodeshiftCommunity',
  projectName: 'CodeshiftCommunity',
  themeConfig: {
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
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href:
                'https://stackoverflow.com/questions/tagged/CodeshiftCommunity',
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
              href:
                'https://github.com/CodeshiftCommunity/CodeshiftCommunity/projects/1',
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
