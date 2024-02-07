import inquirer from 'inquirer';

import { Config } from '@hypermod/types';

export const getConfigPrompt = (config: Config) => {
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
    name: 'codemod',
    message: 'Which codemod would you like to run?',
    choices,
  };
};

export const getMultiConfigPrompt = (
  configs: { filePath: string; config: Config }[],
) => {
  const choices = configs.reduce<any[]>((accum, { filePath, config }) => {
    function mapToConfig(codemods: Record<string, string> = {}) {
      return Object.keys(codemods).map(codemodKey => ({
        name: codemodKey,
        value: {
          filePath,
          selection: codemodKey,
        },
        short: `${codemodKey} from ${filePath}`,
      }));
    }

    const transforms = mapToConfig(config.transforms);
    const presets = mapToConfig(config.presets);

    return [
      ...accum,
      new inquirer.Separator(filePath),
      transforms.length ? new inquirer.Separator('Transforms') : undefined,
      ...transforms,
      presets.length ? new inquirer.Separator('Presets') : undefined,
      ...presets,
    ].filter(item => item !== undefined);
  }, []);

  return {
    type: 'list',
    name: 'codemod',
    message: 'Which codemod would you like to run?',
    choices,
  };
};
