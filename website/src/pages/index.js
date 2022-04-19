import React from 'react';

import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.css';
import Logo from '@site/static/img/logo.svg';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={siteConfig.title}
      description="Write, test, publish and consume codemods in a structured, standardized and familiar way."
    >
      <header className={clsx(styles.heroBanner)}>
        <div className={clsx(styles.container, styles.heroContainer)}>
          <h1 className={clsx(styles.heroHeadingBanner)}>
            The community-owned codemod registry.
          </h1>
          <p className="hero__subtitle">
            Write, test, publish and consume codemods in a structured,
            standardized and familiar way.
          </p>
          <p></p>
          <Link
            to={useBaseUrl('docs/')}
            className={clsx(
              'button button--primary button--lg',
              styles.bannerButton,
            )}
          >
            Read the docs
          </Link>
        </div>
      </header>
      <main className={clsx(styles.landingContent)}>
        <section className={clsx(styles.heroSection, styles.features)}>
          <div className={clsx(styles.container, styles.containerLarge)}>
            <div className="row">
              <div className={clsx('col col--3')}>
                <div className={clsx(styles.valueContainer)}>
                  <span
                    role="img"
                    aria-label="truck"
                    className={clsx(styles.valueContainerIcon)}
                  >
                    🎁
                  </span>{' '}
                  <h3>Publish</h3>
                  <p>
                    Create, test and publish your own codemods for your users
                  </p>
                </div>
              </div>
              <div className={clsx('col col--3')}>
                <div className={clsx(styles.valueContainer)}>
                  <span
                    role="img"
                    aria-label="book"
                    className={clsx(styles.valueContainerIcon)}
                  >
                    🌱
                  </span>{' '}
                  <h3>Up-skill</h3>
                  <p>
                    Up-skill your engineering team using our guides & resources
                  </p>
                </div>
              </div>
              <div className={clsx('col col--3')}>
                <div className={clsx(styles.valueContainer)}>
                  <span
                    role="img"
                    aria-label="bolt"
                    className={clsx(styles.valueContainerIcon)}
                  >
                    ⚡️
                  </span>{' '}
                  <h3>Go fast</h3>
                  <p>
                    Use our helpers & testing utilities to make writing codemods
                    a breeze
                  </p>
                </div>
              </div>
              <div className={clsx('col col--3')}>
                <div className={clsx(styles.valueContainer)}>
                  <span
                    role="img"
                    aria-label="telescope"
                    className={clsx(styles.valueContainerIcon)}
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
          </div>
        </section>
        <section className={clsx(styles.heroSection)}>
          <div
            className={clsx(
              styles.container,
              styles.heroContainer,
              styles.containerCenter,
            )}
          >
            <h2 className={clsx(styles.heroHeadingBanner)}>
              Bring users with you.
            </h2>
            <p>
              Don't let APIs of the past hold you back. Give users the tools
              they need to upgrade across major versions by creating
              version-targetted codemods.
            </p>
          </div>
          <div className={clsx(styles.container, styles.containerLarge)}>
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
          <div className={clsx(styles.container, styles.containerLarge)}>
            <h2 className={clsx(styles.heroHeadingBanner)}>How it works</h2>
            <ol className={clsx(styles.heroList)}>
              <li>
                <div className="row">
                  <div className="col col--4">
                    <h3 className={clsx(styles.heroHeadingSecondary)}>
                      1. Initialize your project
                    </h3>
                    <p>
                      Instantly create a brand new codeshift package that can be
                      run from anywhere.
                    </p>
                  </div>
                  <div className="col col--8">
                    <CodeBlock className="language-bash">
                      $ npx @codeshift/cli init --packageName foobar
                    </CodeBlock>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col col--4">
                    <h3 className={clsx(styles.heroHeadingSecondary)}>
                      2. Create a config
                    </h3>
                    <p>Label and organise your codemods.</p>
                    <ul>
                      <li>
                        <strong>Transforms:</strong> codemods that modify
                        package across multiple versions
                      </li>
                      <li>
                        <strong>Presets:</strong> Utility codemods that support
                        the use of a package
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
              </li>
              <li>
                <div className="row">
                  <div className="col col--4">
                    <h3 className={clsx(styles.heroHeadingSecondary)}>
                      3. Write your codemod
                    </h3>
                    <p>
                      Painlessly author your codemod using our delightful
                      library of utilities and documentation.
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
              </li>
              <li>
                <div className="row">
                  <div className="col col--4">
                    <h3 className={clsx(styles.heroHeadingSecondary)}>
                      4. Publish
                    </h3>
                    <p>
                      With a single command, share your codemods with the world.
                      No need to create a bespoke CLI client.
                    </p>
                  </div>
                  <div className="col col--8">
                    <CodeBlock className="language-bash">
                      $ npm publish
                    </CodeBlock>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col col--4">
                    <h3 className={clsx(styles.heroHeadingSecondary)}>
                      5. Run
                    </h3>
                    <p>
                      Give your consumers a single API to keep their code up to
                      date with the latest and greatest.
                    </p>
                  </div>
                  <div className="col col--8">
                    <CodeBlock className="language-bash">
                      $ npx @codeshift/cli -p foobar@12.0.0 path/to/src
                    </CodeBlock>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </section>
        <section className={clsx(styles.heroSection)}>
          <div className={clsx(styles.container, styles.containerCenter)}>
            <h2 className={clsx(styles.heroHeadingBanner)}>
              Help make the JS ecosystem a better place.
            </h2>
            <p>
              CodeshiftCommunity exists to make dependency management feel less
              of a juggling act. But it's a team effort...
            </p>
            <div className={styles.buttons}>
              <Link
                to={useBaseUrl('docs/')}
                className={clsx('button button--primary button--lg')}
              >
                Join our community!
              </Link>
            </div>
          </div>
        </section>
        <section className={clsx(styles.logoBanner)}>
          <div className={clsx(styles.containerCenter)}>
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
