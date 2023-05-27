import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

const RegistyTile = props => {
  return (
    <div className={clsx(styles.tile)}>
      <img className={clsx(styles.tileBanner)} src={props.src} />
    </div>
  );
};

export default RegistyTile;
