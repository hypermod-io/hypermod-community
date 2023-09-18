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

  it('should remove unused variables in function declaration', async () => {
    const result = await applyTransform(
      transformer,
      `export function hello() { var a = 1; debugger; }`,
    );

    expect(result).toMatchInlineSnapshot(`
      "export function hello() {
        debugger;
      }"
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

  it('should not remove exported variables', async () => {
    const result = await applyTransform(transformer, `export const x = 1;`);
    expect(result).toMatchInlineSnapshot(`"export const x = 1;"`);
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

  it('should remove nested unused function in nested scope', async () => {
    const result = await applyTransform(
      transformer,
      `
function bar() {
  function foo() {
    if (true) {
      const a = 1;
    }
  }
}`,
    );

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should remove nested unused function in used function scope', async () => {
    const result = await applyTransform(
      transformer,
      `
export function bar() {
  console.log('foo');
  function foo() {
    if (true) {
      const a = 1;
    }
  }
}`,
    );

    expect(result).toMatchInlineSnapshot(`
      "export function bar() {
        console.log('foo');
      }"
    `);
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

  it.skip('should remove unused variable in destructuring assignment', async () => {
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
