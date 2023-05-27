import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

const Tile = props => {
  return (
    <div className={clsx(styles.tile)} style={props.style}>
      {props.children}
    </div>
  );
};

export default Tile;
