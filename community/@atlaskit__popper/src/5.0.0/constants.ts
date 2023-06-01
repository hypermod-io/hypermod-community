export const messageForUsingExpression = `
Popper.js has been upgraded from 1.14.1 to 2.4.2,
and as a result the offset prop has changed to be an array. e.g '0px 8px' -> [0, 8]
Along with this change you cannot use vw, vh or % units or addition or multiplication
Change the offset value to use pixel values
Further details can be found in the popper docs https://popper.js.org/docs/v2/modifiers/offset/
`;

export const messageForUsingVariable = `
Popper.js has been upgraded from 1.14.1 to 2.4.2, and as a result the offset
prop has changed to be an array. e.g '0px 8px' -> [0, 8]
As you are using a variable, you will have change the offset prop manually
Further details can be found in the popper docs https://popper.js.org/docs/v2/modifiers/offset/
`;

export const messageForModifierProps = `
Popper.js has been upgraded from 1.14.1 to 2.4.2,
and as a result the modifier prop has changed significantly. The format has been
changed from object of objects, to array of objects, with the key for each modifier
replaced with a name key:value pair inside the modifier object, and an options:object
pair for configuration and other changes unique to each modifier.
Further details can be found in the popper docs: https://popper.js.org/docs/v2/modifiers/
`;
