module.exports = {
  docs: [
    {
      label: 'Getting Started',
      type: 'category',
      collapsed: false,
      items: [
        'introduction',
        'guiding-principles',
        'faq',
        'ecosystem',
        'glossary',
      ],
    },
    {
      label: 'Docs',
      type: 'category',
      collapsed: false,
      items: [
        'authoring',
        'consuming',
        'configuration',
        'testing',
        'motions',
        'contribution',
        'external-packages',
      ],
    },
    {
      label: 'Guides',
      type: 'category',
      collapsed: false,
      items: [
        'guides/your-first-codemod',
        'guides/understanding-asts',
        'guides/when-not-to-codemod',
        'guides/prompting-for-human-input',
        'guides/css-codemods',
        'guides/monorepos',
      ],
    },
    {
      label: 'Recipes',
      type: 'category',
      collapsed: false,
      items: [
        'recipes/import-manipulation',
        'recipes/react',
        'recipes/typescript',
      ],
    },
  ],
  api: [
    {
      label: 'Packages',
      type: 'category',
      collapsible: false,
      collapsed: false,
      items: ['api/cli', 'api/utils', 'api/test-utils'],
    },
  ],
  registry: [
    {
      label: 'Registry',
      type: 'category',
      collapsible: false,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'registry',
      },
      items: [
        {
          dirName: 'registry-generated',
          type: 'autogenerated',
        },
      ],
    },
  ],
};
