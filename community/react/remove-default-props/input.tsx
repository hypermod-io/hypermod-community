import React from 'react';

export function Component() {
  return <span>Hi {name}</span>;
}

Component.defaultProps = { name: 'Oleg' };
