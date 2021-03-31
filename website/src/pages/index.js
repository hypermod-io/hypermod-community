import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
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
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Logo title="CodeshiftCommunity logo" width="320px" />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <p>
                Codeshift Community is a community-owned global registry and
                documentation hub for codemods.
              </p>
              <p>
                <em>
                  Think{' '}
                  <Link
                    href="https://github.com/DefinitelyTyped/DefinitelyTyped"
                    target="_blank"
                  >
                    DefinitelyTyped
                  </Link>{' '}
                  for codemods.
                </em>
              </p>
              <p>
                Providing library maintainers and their users with facilities to
                help write, test, publish and consume codemods in a structured,
                standardized and familiar way.
              </p>
            </div>
            <div className="row">
              <h2>Features</h2>
              <ul>
                <li>
                  <span role="img" aria-label="telescope">
                    🔭
                  </span>{' '}
                  Explore codemods created by the community
                </li>
                <li>
                  <span role="img" aria-label="truck">
                    🚛
                  </span>{' '}
                  Create & publish your own codemods
                </li>
                <li>
                  <span role="img" aria-label="robot">
                    🤖
                  </span>{' '}
                  Helpers & Testing utilities
                </li>
                <li>
                  <span role="img" aria-label="book">
                    📖
                  </span>{' '}
                  Learning resources, guides and more!
                </li>
              </ul>
            </div>
            <div className="row">
              <h2>Getting started</h2>
              <ul>
                <li>
                  <Link href="docs/authoring">Writing codemods</Link>
                </li>
                <li>
                  <Link href="docs/testing">Testing codemods</Link>
                </li>
                <li>
                  <Link href="docs/your-first-codemod">
                    Guides & learning resources
                  </Link>
                </li>
                <li>
                  <Link href="docs/contribution">
                    Publishing & contribution
                  </Link>
                </li>
                <li>
                  <Link href="docs/consuming">Consuming codemods</Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
