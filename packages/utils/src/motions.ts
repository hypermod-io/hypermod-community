import core from 'jscodeshift';

interface MotionCallback<T = any> {
  (j: core.JSCodeshift, source: core.Collection<T>): void;
}

export function applyMotions(
  j: core.JSCodeshift,
  source: ReturnType<typeof j>,
  motions: MotionCallback[],
) {
  motions.forEach(motionTransformer => motionTransformer(j, source));
}
