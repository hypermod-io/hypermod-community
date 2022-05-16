import inquirer from 'inquirer';

import { CodeshiftConfig } from '@codeshift/types';

export const getTransformPrompt = (config: CodeshiftConfig) => {
  const transforms = Object.keys(config.transforms || {});
  const presets = Object.keys(config.presets || {});

  const choices = [
    transforms.length ? new inquirer.Separator('Transforms') : undefined,
    ...transforms,
    presets.length ? new inquirer.Separator('Presets') : undefined,
    ...presets,
  ].filter(item => item !== undefined);

  return {
    type: 'list',
    name: 'transform',
    message: 'Which transform would you like to run?',
    choices,
  };
};
