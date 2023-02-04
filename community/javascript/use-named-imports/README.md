# use-named-imports

Naively convert a default import to a named import using the original name,
which may not match what the module is actually exporting. This codemod would
need following up on with ESLint and some manual fixes.

```js
/* INPUT */
import masthead from "@sky-uk/koa-masthead";

/* OUTPUT */
import { masthead } from "@sky-uk/koa-masthead";
```
