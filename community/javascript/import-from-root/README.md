# import-from-root

Rewrite deep imports to import from a packages' root index.

> Set the Environment Variable `IMPORT_FROM_ROOT` to apply this transform only
> to packages whose name starts with that string:
> `IMPORT_FROM_ROOT=some-package yarn import-from-root <path-to-file>`

```js
/* INPUT */
import { foo } from "some-package/foo/bar/baz";

/* OUTPUT */
import { foo } from "some-package";
```
