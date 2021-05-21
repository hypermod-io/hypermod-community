import core from 'jscodeshift';

export function applyMotions(
  j: core.JSCodeshift,
  source: ReturnType<typeof j>,
  motions: Function[],
) {
  motions.forEach(motionTransformer => motionTransformer(j, source));
}
