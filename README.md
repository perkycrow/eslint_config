# @perkycrow/eslint_config

Shared ESLint **flat config** + custom rules for PerkyCrow JS projects. Drop it
into any project so they all lint identically, with per-project overrides when
needed.

## Install

Consumed as a git dependency (not published to npm). `eslint` is a peer
dependency — each project installs its own.

```jsonc
// locked to a tagged version (public repo — shorthand resolves over HTTPS):
"@perkycrow/eslint_config": "github:perkycrow/eslint_config#v0.1.0"
```

> If the repo is private, the `github:` shorthand needs a token (it fetches over
> HTTPS). Use `git+ssh://git@github.com/perkycrow/eslint_config.git#v0.1.0` to
> resolve over your SSH key instead.

## Usage

The whole project config becomes a few lines in `eslint.config.mjs`:

```js
import perky from '@perkycrow/eslint_config'
export default perky
```

With project-specific ignores and/or overrides (flat config is "last wins"):

```js
import {defineConfig, globalIgnores} from 'eslint/config'
import perky from '@perkycrow/eslint_config'

export default defineConfig([
    globalIgnores(['mist_old/*']),   // ignore specific to this project
    ...perky,
    {rules: {'complexity': 0}}       // override specific to this project
])
```

VSCode picks this up automatically — the ESLint extension reads the project's
installed `eslint` + its `eslint.config.mjs`. No per-project setup beyond the
dependency and these few lines.

## What's included

- The full PerkyCrow rule set (style, correctness, complexity limits).
- `globals.browser` + `globals.node` + `globals.vitest` by default. A project
  that needs different globals overrides `languageOptions.globals`.
- Default ignores: `node_modules/*`, `dist/*`.
- Relaxed overrides for `**/*.test.js` and `**/*.doc.js` / `**/*.guide.js`.
- Two custom rules under the `perky/` namespace (see below).

## Custom rules

Bundled in `plugin.js` (also exported at `@perkycrow/eslint_config/plugin`),
registered by the config as the `perky` plugin:

- `perky/nested-complexity` — measures complexity by **path depth** (nesting)
  rather than cumulative count. Default max 4.
- `perky/class-methods-use-this` — flags class methods that don't use `this`
  (candidates to extract as functions), with PerkyCrow-specific allowances.

Disable inline like any rule: `// eslint-disable-line perky/nested-complexity`.

## Tests

```sh
yarn test
```

Rule tests run via ESLint's `RuleTester` with `globals` off, so invalid-case
assertions actually execute (under `globals: true` host runners they can be
silently dropped).
