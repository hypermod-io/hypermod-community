import React from 'react';

export const Component = () => {
  return <span>Hi {name}</span>;
};

Component.defaultProps = { name: 'Oleg' };
