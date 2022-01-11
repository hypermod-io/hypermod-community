import React from 'react';

import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.css';
import Logo from '@site/static/img/logo.svg';

export default function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header
        className={clsx('hero', styles.heroBanner, styles.landingContent)}
      >
        <div className={clsx('container', styles.heroContainer)}>
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              to={useBaseUrl('docs/')}
              className={clsx('button button--primary button--lg')}
            >
              Read the docs
            </Link>
          </div>
        </div>
      </header>
      <main className={clsx(styles.landingContent)}>
        <section className={clsx(styles.heroSection)}>
          <div className={clsx('container', styles.heroContainerCenter)}>
            <p>
              The community-owned global registry and documentation hub for
              codemods.
            </p>
            <p>
              Providing library maintainers and their users with facilities to
              help write, test, publish and consume codemods in a structured,
              standardized and familiar way.
            </p>
          </div>
        </section>
        <section className={clsx(styles.heroSection, styles.features)}>
          <div className={clsx('container', styles.heroContainer)}>
            <div className="row">
              <div className={clsx('col col--3')}>
                <span
                  role="img"
                  aria-label="truck"
                  style={{ fontSize: '60px' }}
                >
                  🚛
                </span>{' '}
                <h3>Publish</h3>
                <p>Create, test and publish your own codemods for your users</p>
              </div>
              <div className={clsx('col col--3')}>
                <span role="img" aria-label="book" style={{ fontSize: '60px' }}>
                  📖
                </span>{' '}
                <h3>Up-skill</h3>
                <p>
                  Up-skill your engineering team using our guides & resources
                </p>
              </div>
              <div className={clsx('col col--3')}>
                <span role="img" aria-label="bolt" style={{ fontSize: '60px' }}>
                  ⚡️
                </span>{' '}
                <h3>Go fast</h3>
                <p>
                  Use our helpers & testing utilities to make writing codemods a
                  breeze
                </p>
              </div>
              <div className={clsx('col col--3')}>
                <span
                  role="img"
                  aria-label="telescope"
                  style={{ fontSize: '60px' }}
                >
                  🔭
                </span>{' '}
                <h3>Registry</h3>
                <p>
                  Explore an extensive list of codemods contributed by the
                  community
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={clsx(styles.heroSection)}>
          <div className={clsx('container', styles.heroContainer)}>
            <h2>Bring your users with you</h2>
            <p>
              Don't let APIs of the past hold you back. Help your users upgrade
              across major versions by creating version-targetted codemods.
            </p>
          </div>
          <div className={clsx('container')}>
            <div className="row">
              <div className={clsx('col col--4')}>
                <CodeBlock className="language-diff">
                  {`+import Button from '@my-lib/button';


+const App = () => (
+  <Button
+    appearance="bold"
+    handleClick=()
+  >
+    Submit
+  </Button>
+);`}
                </CodeBlock>
                <div className={clsx(styles.center)}>
                  <span className={clsx(styles.lozenge)}>v1.0.0</span>
                </div>
              </div>
              <div className={clsx('col col--4')}>
                <CodeBlock className="language-diff">
                  {`-import Button from '@my-lib/button';
+import Button from '@foobar/button';


const App = () => (
  <Button
    appearance="bold"
-    handleClick=()
+    onClick=()
  >
    Submit
  </Button>
);`}
                </CodeBlock>
                <div className={clsx(styles.center)}>
                  <span className={clsx(styles.lozenge)}>v2.0.0</span>
                </div>
              </div>
              <div className={clsx('col col--4')}>
                <CodeBlock className="language-diff">
                  {`import Button from '@foobar/button';

const App = () => (
  <Button
-   appearance="bold"
+   appearance="primary"
    onClick=()
  >
    Submit
  </Button>
);`}
                </CodeBlock>
                <div className={clsx(styles.center)}>
                  <span className={clsx(styles.lozenge)}>v3.0.0</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={clsx(styles.heroSection)}>
          <div className={clsx('container', styles.heroContainer)}>
            <h2>How it works</h2>
            <div className="row">
              <div className="col col--4">
                <h3>1. Initialize your project</h3>
                <p>
                  Instantly create a brand new codeshift package that can be run
                  from anywhere.
                </p>
              </div>
              <div className="col col--8">
                <CodeBlock className="language-bash">
                  $ codeshift init --packageName foobar
                </CodeBlock>
              </div>
            </div>
            <div className="row">
              <div className="col col--4">
                <h3>2. Create a config</h3>
                <p>Label and organise your codemods.</p>
                <ul>
                  <li>
                    <strong>Transforms:</strong> codemods that modify package
                    across multiple versions
                  </li>
                  <li>
                    <strong>Presets:</strong> Utility codemods that support the
                    use of a package
                  </li>
                </ul>
              </div>
              <div className="col col--8">
                <CodeBlock className="language-js">
                  {`export.module = {
  transforms: {
    '12.0.0': require.resolve('./18.0.0/transform'),
    '13.0.0': require.resolve('./19.0.0/transform'),
  },
  presets: {
    'format-imports': require.resolve('./format-imports/transform')
  }
};`}
                </CodeBlock>
              </div>
            </div>
            <div className="row">
              <div className="col col--4">
                <h3>3. Write your codemod</h3>
                <p>
                  Painlessly author your codemod using our delightful library of
                  utilities and documentation.
                </p>
              </div>
              <div className="col col--8">
                <CodeBlock className="language-js">{`import {
  hasImportDeclaration,
  renameImportDeclaration,
} from '@codeshift/utils';

function transformer(file, { jscodeshift: j }) {
  const source = j(file.source);
  const oldImport = 'bar';
  const newImport = 'foobar';

  if (!hasImportDeclaration(j, source, oldImport)) {
    return file.source;
  }

  renameImportDeclaration(j, source, oldImport, newImport),

  return source.toSource();
}

export default transformer;`}</CodeBlock>
              </div>
            </div>
            <div className="row">
              <div className="col col--4">
                <h3>4. Publish</h3>
                <p>
                  With a single command, share your codemods with the world. No
                  need to create a bespoke CLI client.
                </p>
              </div>
              <div className="col col--8">
                <CodeBlock className="language-bash">$ npm publish</CodeBlock>
              </div>
            </div>
            <div className="row">
              <div className="col col--4">
                <h3>5. Run</h3>
                <p>
                  Give your consumers a single API to keep their code up to date
                  with the latest and greatest.
                </p>
              </div>
              <div className="col col--8">
                <CodeBlock className="language-bash">
                  $ codeshift -p foobar@12.0.0 path/to/src
                </CodeBlock>
              </div>
            </div>
          </div>
        </section>
        <section className={clsx(styles.heroSection)}>
          <div className={clsx('container', styles.heroContainerCenter)}>
            <h2>Let's work together to make the JS ecosystem a better place</h2>
            <p>
              Keeping your dependencies up to date often feels like a juggling
              act. CodeshiftCommunity exists to make problem go away, but it's a
              team effort.
            </p>
            <p>Join the community, become a Codeshifter today!</p>
            <div className={styles.buttons}>
              <Link
                to={useBaseUrl('docs/')}
                className={clsx('button button--primary button--lg')}
              >
                Read the docs
              </Link>
            </div>
          </div>
        </section>
        <section className={clsx(styles.heroSection, styles.logoBanner)}>
          <div className={clsx('container', styles.heroContainerCenter)}>
            <Logo
              title="CodeshiftCommunity logo"
              style={{ maxWidth: '160px', width: '100%' }}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
