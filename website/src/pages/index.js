import React from 'react';

import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.css';
import Logo from '@site/static/img/logo.svg';
import RegistyTile from '../components/registry-tile';
import Tile from '../components/tile';
import Marquee from '../components/marquee';
import { LineChartPositive, LineChartNegative } from '../components/graphs';

export default function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={
        'Codemods for Improved Development Workflow - Automate Refactoring, Manage Dependencies, and Modernize Your Code'
      }
      description="Discover the power of codemods for your development workflow. Our tools and resources allow you to easily manage dependencies, automate refactoring, and transform your codebase. With support for code migration and evolution, you can modernize your code and keep it up-to-date with the latest best practices. Try our tools today and improve your development process."
    >
      <header className={clsx(styles.heroBanner)}>
        <div className={clsx(styles.container)}>
          <h1 className={clsx(styles.heroHeadingBanner)}>
            The ultimate code evolution toolchain.
          </h1>
          <p className={clsx(styles.heroSubtitle)}>
            Put your codebase on a <em>diet</em>, with automated for code
            migration and monitoring you can modernize your code and keep it
            up-to-date with best practices.
          </p>
          <Link
            to={useBaseUrl('docs/')}
            className={clsx(
              'button button--primary button--xl',
              styles.bannerButton,
            )}
          >
            Read the docs
          </Link>
        </div>
      </header>
      <main className={clsx(styles.landingContent)}>
        <section className={clsx(styles.heroSection, styles.features)}>
          <div className={clsx(styles.container)}>
            <h2 className={clsx(styles.heroHeadingBanner)}>
              Automated refactoring
            </h2>
            <p>
              Discover the power of codemods for your development workflow. Our
              tools and resources allow you to easily manage dependencies,
              automate refactoring, and transform your codebase.
            </p>
          </div>
        </section>
        <section className={clsx(styles.heroSection, styles.features)}>
          <div className={clsx(styles.container)}>
            <h2 className={clsx(styles.heroHeadingBanner)}>
              Monitor migrations at scale
            </h2>
            <p>
              Build expressive queries to track dependency migrations, technical
              debt or adoption of new APIs.
            </p>
            <div className="row">
              <div className={clsx('col col--6')}>
                <Tile>
                  <p className={clsx(styles.chartTitle)}>+ 98%</p>
                  <p className={clsx(styles.chartSubtitle)}>
                    styled-components to emotion
                  </p>
                  <LineChartPositive
                    style={{
                      width: '100%',
                      height: 'auto',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                    }}
                  />
                </Tile>
              </div>
              <div className={clsx('col col--6')}>
                <Tile>
                  <p className={clsx(styles.chartTitle)}>- 43%</p>
                  <p className={clsx(styles.chartSubtitle)}>Emotion Adoption</p>
                  <LineChartNegative
                    style={{
                      width: '100%',
                      height: 'auto',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                    }}
                  />
                </Tile>
              </div>
            </div>
            <div className="row">
              <div className={clsx('col col--12')}>
                <Tile></Tile>
              </div>
            </div>
          </div>
        </section>
        <section className={clsx(styles.heroSection, styles.features)}>
          <div className={clsx(styles.container)}>
            <h2 className={clsx(styles.heroHeadingBanner)}>
              Dependency bumps to the max
            </h2>
            <p>
              Recieve fully automated dependency upgrates even for major
              versions.
            </p>
          </div>
        </section>

        <section className={clsx(styles.heroSection)}>
          <div className={clsx(styles.container)}>
            <h2 className={clsx(styles.heroHeadingBanner)}>
              Explore the community registry
            </h2>
            <p>
              Browse our registry of ready to use codemods to help automatically
              refactor your codebase, or contribute your own codemods to share
              with the community.
            </p>
          </div>
          <Marquee>
            <RegistyTile src="/img/registry-tile.jpeg" />
            <RegistyTile src="/img/registry-tile.jpeg" />
            <RegistyTile src="/img/registry-tile.jpeg" />
            <RegistyTile src="/img/registry-tile.jpeg" />
            <RegistyTile src="/img/registry-tile.jpeg" />
            <RegistyTile src="/img/registry-tile.jpeg" />
            <RegistyTile src="/img/registry-tile.jpeg" />
            <RegistyTile src="/img/registry-tile.jpeg" />
          </Marquee>
        </section>
        <section className={clsx(styles.heroSection, styles.features)}>
          <div className={clsx(styles.container)}>
            <h2 className={clsx(styles.heroHeadingBanner)}>
              Build & publish your own
            </h2>
            <p>
              Don't let APIs of the past hold you back. Give users the tools
              they need to upgrade across major versions by creating
              version-targeted codemods.
            </p>
            <div className="row">
              <div className={clsx('col col--6')}>
                <Tile>
                  <p>Scaffold a project in seconds.</p>
                  <CodeBlock className="language-bash">
                    $ npx @codeshift/cli init react-codemods
                  </CodeBlock>
                </Tile>
              </div>
              <div className={clsx('col col--6')}>
                <Tile></Tile>
              </div>
            </div>
          </div>
        </section>
        <section className={clsx(styles.heroSection)}>
          <div className={clsx(styles.container)}>
            <h2 className={clsx(styles.heroHeadingBanner)}>
              Bring users with you.
            </h2>
            <p>
              Don't let APIs of the past hold you back. Publish codemods for
              your own libraries and give users the tools they need to upgrade
              across major versions by creating version-targeted codemods.
            </p>
          </div>
        </section>
        <section className={clsx(styles.heroSection)}>
          <div className={clsx(styles.container)}>
            <Tile style={{ padding: '3rem' }}>
              <div className="row">
                <div className={clsx('col col--6')}></div>
                <div className={clsx('col col--6')}>
                  <h2 className={clsx()}>
                    Help make the JS ecosystem a better place.
                  </h2>
                  <p>
                    CodeshiftCommunity exists to make dependency management feel
                    less of a juggling act. But it's a team effort...
                  </p>
                  <div className={styles.buttons}>
                    <Link
                      to={'https://discord.gg/XGqmKNZ8Rk'}
                      className={clsx('button button--primary button--lg')}
                    >
                      Join our community on discord!
                    </Link>
                  </div>
                </div>
              </div>
            </Tile>
          </div>
        </section>
        {/* <div className={clsx(styles.logoBanner)}>
          <div className={clsx(styles.containerCenter)}>
            <Logo
              title="CodeshiftCommunity logo"
              style={{ maxWidth: '160px', width: '100%' }}
            />
          </div>
        </div> */}
      </main>
    </Layout>
  );
}
