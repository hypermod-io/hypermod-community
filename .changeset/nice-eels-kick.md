---
'@hypermod/fetcher': patch
---

Added blacklist to remote package fetcher to ensure dependencies such as `javascript` aren't downloaded since they will never contain a hypermod.config file.
