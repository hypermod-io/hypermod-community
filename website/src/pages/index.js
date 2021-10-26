import React from 'react';
import clsx from 'clsx';
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
        <div className={clsx('container', styles.heroContainer)}>
          <Logo
            title="CodeshiftCommunity logo"
            style={{ maxWidth: '160px', width: '100%' }}
          />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              to={useBaseUrl('docs/')}
              className={clsx(
                'button button--secondary button--lg',
                styles.getStarted,
              )}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className={clsx(styles.heroSection)}>
          <div className={clsx('container', styles.heroContainerCenter)}>
            <p>
              CodeshiftCommunity is a community-owned global registry and
              documentation hub for codemods.
            </p>
            <p>
              Providing library maintainers and their users with facilities to
              help write, test, publish and consume codemods in a structured,
              standardized and familiar way.
            </p>
          </div>
        </section>
        <section className={clsx(styles.heroSection, styles.blockQuoteSection)}>
          <div className={clsx('container', styles.blockQuoteContainer)}>
            <blockquote>
              It's like{' '}
              <Link
                href="https://github.com/DefinitelyTyped/DefinitelyTyped"
                target="_blank"
              >
                DefinitelyTyped
              </Link>{' '}
              but for codemods.
            </blockquote>
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
            <h2>Get started</h2>
            <div className="row">
              <ul>
                <li>
                  <Link href="docs/authoring">Writing codemods</Link>
                </li>
                <li>
                  <Link href="docs/testing">Testing codemods</Link>
                </li>
                <li>
                  <Link href="docs/guiding-principles">Guiding principles</Link>
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
