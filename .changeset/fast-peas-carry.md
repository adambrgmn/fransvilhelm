---
'@fransvilhelm/feather': major
---

Use svg props as context instead of separate props/style

Previously we separated svg props and svg styles in the context. But that is no
longer supported. Instead context is formatted as standard svg props. Regular
props, e.g. `aria-hidden` etc. are applied directly on the context. Styles go
under `context.styles`.
