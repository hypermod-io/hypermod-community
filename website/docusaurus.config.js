/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'CodeshiftCommunity',
  tagline: 'Codemods for everyone ✨',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/CodeshiftCommunity/',
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
          to: 'docs/',
          activeBasePath: 'docs',
          docId: 'introduction',
          label: 'Docs',
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
              label: 'Discord',
              href: 'https://discordapp.com/invite/CodeshiftCommunity',
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
            'https://github.com/CodeshiftCommunity/CodeshiftCommunity/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
