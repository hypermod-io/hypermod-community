/**
 *
 * Example hash format
 * @example
 * ```ts
 * // TODO: This file has been altered by a codemod. integrity: codemod-hash-5131781
 * ```
 */
export function hash(str: string) {
  let hashValue = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hashValue = (hashValue << 5) - hashValue + char;
    hashValue = hashValue & hashValue; // Convert to 32bit integer
  }
  return `codemod-hash-${Math.abs(hashValue)}`;
}
