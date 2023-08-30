import { applyTransform } from '@hypermod/utils';
import * as transformer from './transform';

describe('javascript#remove-unused-vars transform', () => {
  it('should remove unused variables', async () => {
    const result = await applyTransform(
      transformer,
      `
const x = 1;
const y = 2;
console.log(y);
    `,
    );

    expect(result).toMatchInlineSnapshot(`
      "const y = 2;
      console.log(y);"
    `);
  });

  it('should not remove used variables', async () => {
    const result = await applyTransform(
      transformer,
      `
const x = 1;
const y = 2;
console.log(x + y);
    `,
    );
    expect(result).toMatchInlineSnapshot(`
      "const x = 1;
      const y = 2;
      console.log(x + y);"
    `);
  });

  it('should remove unused variable in nested scope', async () => {
    const result = await applyTransform(
      transformer,
      `
{
  if (true) {
    const a = 1;
  }
}`,
    );

    expect(result).toMatchInlineSnapshot(`
      "{
        if (true) {}
      }"
    `);
  });

  it('should remove unused function in nested scope', async () => {
    const result = await applyTransform(
      transformer,
      `
function foo() {
  if (true) {
    const a = 1;
  }
}`,
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should remove unused variable in for loop', async () => {
    const result = await applyTransform(
      transformer,
      `
for (let i = 0; i < 10; i++) {
  const a = i;
}
      `,
    );

    expect(result).toMatchInlineSnapshot(`"for (let i = 0; i < 10; i++) {}"`);
  });

  it('should remove unused variable in destructuring assignment', async () => {
    const result = await applyTransform(
      transformer,
      `
const { a, b } = { a: 1, b: 2 };
console.log(a);
      `,
    );

    expect(result).toMatchInlineSnapshot(`
      "const {
        a
      } = { a: 1, b: 2 };
      console.log(a);"
    `);
  });

  it('should remove unused function argument', async () => {
    const result = await applyTransform(
      transformer,
      `
function foo(a, b) {
  console.log(a);
}
foo(1);
      `,
    );

    expect(result).toMatchInlineSnapshot(`
      "function foo(a) {
        console.log(a);
      }
      foo(1);"
    `);
  });

  it('should not remove used variable in conditional', async () => {
    const result = await applyTransform(
      transformer,
      `
let a;
if (true) {
  a = 1;
}
console.log(a);
      `,
    );

    expect(result).toMatchInlineSnapshot(`
      "let a;
      if (true) {
        a = 1;
      }
      console.log(a);"
    `);
  });

  it('should remove unused function declaration', async () => {
    const result = await applyTransform(
      transformer,
      `
function foo() {
  console.log('Hello, world!');
}
      `,
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });
});
