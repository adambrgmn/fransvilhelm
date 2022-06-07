# @fransvilhelm/feather

## 2.0.0

### Major Changes

- Use svg props as context instead of separate props/style (by [@adambrgmn](https://github.com/adambrgmn) in
  [#53](https://github.com/adambrgmn/fransvilhelm/pull/53))

  Previously we separated svg props and svg styles in the context. But that is no longer supported. Instead context is
  formatted as standard svg props. Regular props, e.g. `aria-hidden` etc. are applied directly on the context. Styles go
  under `context.styles`.

### Patch Changes

- Apply focusable false as default (by [@adambrgmn](https://github.com/adambrgmn) in
  [#53](https://github.com/adambrgmn/fransvilhelm/pull/53))
- Remove feather-icons from dependencies (by [@adambrgmn](https://github.com/adambrgmn) in
  [#125](https://github.com/adambrgmn/fransvilhelm/pull/125))
- Skip applying faulty vector effect (by [@adambrgmn](https://github.com/adambrgmn) in
  [#53](https://github.com/adambrgmn/fransvilhelm/pull/53))
- Bump peer dependencies (by [@adambrgmn](https://github.com/adambrgmn) in
  [#125](https://github.com/adambrgmn/fransvilhelm/pull/125))

## 1.0.1

### Patch Changes

- Fix build error (by [@adambrgmn](https://github.com/adambrgmn) in
  [#13](https://github.com/adambrgmn/fransvilhelm-feather/pull/13))
- Fix type exports (by [@adambrgmn](https://github.com/adambrgmn) in
  [#13](https://github.com/adambrgmn/fransvilhelm-feather/pull/13))
- Fix icon props typings (by [@adambrgmn](https://github.com/adambrgmn) in
  [#8](https://github.com/adambrgmn/fransvilhelm-feather/pull/8))
- Fix icons props (by [@adambrgmn](https://github.com/adambrgmn) in
  [#13](https://github.com/adambrgmn/fransvilhelm-feather/pull/13))

  Remove the unnecessary children requirement.

## 1.0.0

### Major Changes

- Initial release (by [@adambrgmn](https://github.com/adambrgmn) in
  [#1](https://github.com/adambrgmn/fransvilhelm-feather/pull/1))

  This is the initial release of @fransvilhelm/feather.
