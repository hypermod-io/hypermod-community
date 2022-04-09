import core from 'jscodeshift';

export function applyMotions(
  j: core.JSCodeshift,
  source: ReturnType<typeof j>,
  motions: Function[],
) {
  for (const motionTransformer of motions) motionTransformer(j, source);
}
