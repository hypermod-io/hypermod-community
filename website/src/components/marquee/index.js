import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

const Marquee = props => {
  return (
    <div className={clsx(styles.marquee)}>
      <div className={clsx(styles.marqueeInner)}>{props.children}</div>
      <div className={clsx(styles.marqueeInner)} aria-hidden="true">
        {props.children}
      </div>
    </div>
  );
};

export default Marquee;
