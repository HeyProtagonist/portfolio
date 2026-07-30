---
name: conventional-commit
description: >
  Create clear, consistent, and machine-readable Git commit messages using the
  [Conventional Commits](https://www.conventionalcommits.org/) structure with
  Gitmoji prefixes.

  Use this skill whenever generating, reviewing, correcting, or suggesting Git
  commit messages.
---

# Conventional Commit with Gitmoji

## Purpose

Create clear, consistent, and machine-readable Git commit messages using the
[Conventional Commits](https://www.conventionalcommits.org/) structure with
Gitmoji prefixes.

Use this skill whenever generating, reviewing, correcting, or suggesting Git
commit messages.

---

## Commit Format

```text
<type>(<scope>)<breaking-change>: <gitmoji> <description>

[optional body]

[optional footer(s)]
```

### Minimal form

```text
<type>: <gitmoji> <description>
```

### Scoped form

```text
<type>(<scope>): <gitmoji> <description>
```

### Breaking-change form

```text
<type>(<scope>)!: <gitmoji> <description>
```

---

## Required Rules

1. Start every commit subject with exactly one Gitmoji.
2. Add one space after the Gitmoji.
3. Use a valid Conventional Commit type.
4. Use lowercase for the type and scope.
5. Keep the subject concise and imperative.
6. Do not end the subject with a period.
7. Prefer a subject length of 72 characters or fewer.
8. Describe what the commit changes, not what was done during development.
9. Use a scope only when it adds useful context.
10. Use `!` or a `BREAKING CHANGE:` footer for incompatible changes.
11. Do not combine unrelated changes into one commit.
12. Do not invent issue numbers, scopes, or breaking changes.

---

## Allowed Commit Types

| Type | Purpose |
|---|---|
| `feat` | Add a new user-facing feature or capability |
| `fix` | Correct a bug or unintended behavior |
| `docs` | Change documentation only |
| `style` | Change formatting without changing behavior |
| `refactor` | Restructure code without adding features or fixing bugs |
| `perf` | Improve performance |
| `test` | Add or update tests |
| `build` | Change build tools, dependencies, or packaging |
| `ci` | Change CI/CD configuration or scripts |
| `chore` | Perform maintenance not covered by another type |
| `revert` | Revert an earlier commit |

Use the most specific type available. Avoid defaulting to `chore` when another
type better describes the change.

---

## Gitmoji Mapping

Use this table as the default mapping.

| Gitmoji | Code | Recommended type | Meaning |
|---|---|---|---|
| ✨ | `:sparkles:` | `feat` | Introduce a new feature |
| 🐛 | `:bug:` | `fix` | Fix a bug |
| 🩹 | `:adhesive_bandage:` | `fix` | Apply a small or non-critical fix |
| 🚑️ | `:ambulance:` | `fix` | Apply a critical hotfix |
| 🔒️ | `:lock:` | `fix` | Fix a security issue |
| 📝 | `:memo:` | `docs` | Add or update documentation |
| 💄 | `:lipstick:` | `style` | Update UI styling or presentation |
| 🎨 | `:art:` | `style` or `refactor` | Improve code structure or formatting |
| ♻️ | `:recycle:` | `refactor` | Refactor code |
| ⚡️ | `:zap:` | `perf` | Improve performance |
| ✅ | `:white_check_mark:` | `test` | Add, update, or fix tests |
| 🧪 | `:test_tube:` | `test` | Add an experimental or failing test |
| 🔧 | `:wrench:` | `chore` | Change configuration files |
| 🔨 | `:hammer:` | `build` | Change development or build scripts |
| 📦️ | `:package:` | `build` | Add or update compiled files or packages |
| ⬆️ | `:arrow_up:` | `build` | Upgrade dependencies |
| ⬇️ | `:arrow_down:` | `build` | Downgrade dependencies |
| ➕ | `:heavy_plus_sign:` | `build` | Add a dependency |
| ➖ | `:heavy_minus_sign:` | `build` | Remove a dependency |
| 👷 | `:construction_worker:` | `ci` | Add or update CI configuration |
| 💚 | `:green_heart:` | `ci` | Fix a CI build |
| 🚀 | `:rocket:` | `ci` or `chore` | Deploy or release changes |
| 🔖 | `:bookmark:` | `chore` | Create a release or version tag |
| 🗑️ | `:wastebasket:` | `refactor` or `chore` | Remove dead code or files |
| 🔥 | `:fire:` | `refactor` | Remove code or files |
| 🚚 | `:truck:` | `refactor` | Move or rename files |
| ✏️ | `:pencil2:` | `fix` or `docs` | Fix a typo |
| 🌐 | `:globe_with_meridians:` | `feat` | Add internationalization or localization |
| ♿️ | `:wheelchair:` | `feat` or `fix` | Improve accessibility |
| 📱 | `:iphone:` | `feat` or `fix` | Improve responsive behavior |
| 🥅 | `:goal_net:` | `fix` | Improve error handling |
| 🔊 | `:loud_sound:` | `feat` or `chore` | Add or update logs |
| 🔇 | `:mute:` | `chore` | Remove logs |
| 🗃️ | `:card_file_box:` | `feat`, `fix`, or `refactor` | Change database-related code |
| 🏗️ | `:building_construction:` | `refactor` | Change application architecture |
| 🧱 | `:bricks:` | `refactor` | Change infrastructure or modular structure |
| 💥 | `:boom:` | any valid type with `!` | Introduce a breaking change |
| ⏪️ | `:rewind:` | `revert` | Revert changes |
| 🛂 | `:passport_control:` | `feat` or `fix` | Change authorization or permissions |
| 🔐 | `:closed_lock_with_key:` | `feat` or `fix` | Add or update secrets handling |
| 🙈 | `:see_no_evil:` | `chore` | Update ignore files |
| 📄 | `:page_facing_up:` | `chore` | Add or update a license |
| 🍱 | `:bento:` | `chore` | Add or update assets |
| 💡 | `:bulb:` | `docs` | Add explanatory comments |
| 🧹 | `:broom:` | `chore` or `refactor` | Clean up code or repository files |
| 🩺 | `:stethoscope:` | `feat` or `chore` | Add health checks |
| 📈 | `:chart_with_upwards_trend:` | `feat` | Add analytics or tracking |
| 🧑‍💻 | `:technologist:` | `chore` | Improve developer experience |
| 🧵 | `:thread:` | `perf` or `fix` | Change concurrency-related code |
| 🦺 | `:safety_vest:` | `feat` or `fix` | Add validation |
| 🏷️ | `:label:` | `refactor` or `fix` | Add or update types |
| 🥚 | `:egg:` | `feat` | Add an easter egg |
| 🚧 | `:construction:` | `chore` | Work in progress; avoid on protected branches |

The Conventional Commit type represents the semantic purpose of the change.
The Gitmoji provides a visual category. They should agree with one another.

---

## Scope Rules

A scope identifies the affected area.

Good scopes:

```text
auth
api
cli
parser
database
checkout
dashboard
deps
release
github-actions
```

Use a scope when the repository contains distinct components or when the scope
makes the commit substantially clearer.

Avoid:

```text
feat(updated-files): ✨ add feature
fix(misc): 🐛 fix issue
chore(stuff): 🔧 update things
```

---

## Subject Rules

Write the description as an imperative command.

Good:

```text
feat(auth): ✨ add passkey login
fix(api): 🐛 handle expired access tokens
refactor(parser): ♻️ extract token normalization
```

Avoid:

```text
feat(auth): ✨ added passkey login
fix(api): 🐛 fixed token problem
refactor(parser): ♻️ code cleanup
```

Prefer precise verbs such as:

```text
add
remove
prevent
handle
support
replace
rename
extract
simplify
validate
upgrade
document
```

Avoid vague descriptions such as:

```text
update code
fix issue
make changes
minor cleanup
work in progress
various fixes
```

---

## Commit Body

Add a body when the subject alone does not explain the reason or impact.

Rules:

- Leave one blank line after the subject.
- Explain why the change was needed.
- Explain behavior before and after when useful.
- Wrap lines at approximately 72 characters.
- Do not repeat the subject.

Example:

```text
fix(auth): 🐛 reject expired refresh tokens

Refresh tokens were previously validated only for signature and issuer.
Validate the expiration timestamp before issuing a new access token.
```

---

## Footers

Use footers for issue references, co-authors, or breaking-change details.

Examples:

```text
Closes #142
Refs #98
Co-authored-by: Jane Doe <jane@example.com>
```

Do not fabricate metadata.

---

## Breaking Changes

Use either `!` after the type or scope:

```text
feat(api)!: 💥 replace numeric user IDs with UUIDs
```

Or add a footer:

```text
feat(api): 💥 replace numeric user IDs with UUIDs

BREAKING CHANGE: API consumers must now send UUID values for user IDs.
```

Use both when the breaking nature should be especially visible:

```text
feat(api)!: 💥 replace numeric user IDs with UUIDs

BREAKING CHANGE: API consumers must now send UUID values for user IDs.
```

A breaking change must describe migration impact clearly.

---

## Revert Commits

Use:

```text
revert: revert "<original commit subject>"

This reverts commit <commit-hash>.
```

Example:

```text
revert: revert "✨ feat(auth): add passkey login"

This reverts commit 1a2b3c4d.
```

Do not invent the original subject or hash.

---

## Merge Commits

Do not rewrite automatically generated merge commits unless explicitly asked.

When manually describing a merge:

```text
chore: merge branch 'feature/auth' into main
```

Prefer normal Git-generated merge messages when repository policy permits them.

---

## Dependency Changes

Examples:

```text
build(deps): ➕ add zod
build(deps): ⬆️ upgrade angular to v21
build(deps): ⬇️ downgrade typescript to v5.8
build(deps): ➖ remove unused axios dependency
fix(deps): 🔒️ patch vulnerable transitive dependency
```

Use `build(deps)` for ordinary dependency management. Use `fix(deps)` when the
upgrade directly resolves a defect or vulnerability.

---

## Configuration and Tooling

Examples:

```text
chore(eslint): 🔧 enable type-aware linting
build(vite): 🔨 emit assets into the dist directory
ci(github-actions): 👷 cache npm dependencies
ci(github-actions): 💚 fix Windows test workflow
chore(git): 🙈 ignore local environment files
```

---

## Documentation

Examples:

```text
docs: 📝 add local development instructions
docs(api): 📝 document pagination parameters
docs(readme): ✏️ correct installation command
docs(parser): 💡 explain escaped token handling
```

Do not use `docs` when code behavior changes.

---

## Tests

Examples:

```text
test(auth): ✅ cover refresh token expiration
test(cli): ✅ add tests for missing configuration
test(api): 🧪 reproduce intermittent timeout failure
```

A commit containing both a bug fix and its tests should normally use `fix`,
because the behavioral correction is the primary purpose:

```text
fix(auth): 🐛 reject expired refresh tokens
```

---

## Refactoring Versus Fixing

Use `refactor` only when external behavior remains unchanged.

```text
refactor(auth): ♻️ extract token validation service
```

Use `fix` when observable behavior changes from incorrect to correct:

```text
fix(auth): 🐛 reject malformed bearer tokens
```

Use `perf` when the primary result is better runtime performance:

```text
perf(search): ⚡️ cache normalized query tokens
```

---

## Selection Procedure

When generating a commit message:

1. Inspect the actual change or supplied summary.
2. Identify the primary semantic purpose.
3. Select the Conventional Commit type.
4. Select the matching Gitmoji.
5. Infer a narrow scope only when supported by the change.
6. Write an imperative description.
7. Detect whether the change is breaking.
8. Add a body only when necessary.
9. Add footers only from provided information.
10. Validate the final message against all rules.

When multiple unrelated purposes exist, recommend splitting the changes into
separate commits.

---

## Output Behavior

When asked for a commit message, return the commit message first.

For a straightforward change, return only one recommended message:

```text
feat(cli): ✨ add interactive project selection
```

When the change is ambiguous, provide up to three strongly differentiated
options, ordered from most likely to least likely.

When reviewing an existing message:

1. State whether it is valid.
2. Identify specific violations.
3. Provide a corrected version.

Do not surround a single final commit message with quotation marks.

---

## Validation Checklist

Before returning a commit message, verify:

- [ ] Exactly one Gitmoji begins the subject
- [ ] Gitmoji and type have matching intent
- [ ] Type is valid and lowercase
- [ ] Scope is lowercase and meaningful, when present
- [ ] Colon is followed by one space
- [ ] Description is imperative and specific
- [ ] Description does not end with a period
- [ ] Subject is preferably 72 characters or fewer
- [ ] Breaking changes use `!` or a footer
- [ ] Body and footers are separated by blank lines
- [ ] No issue number, scope, or metadata was invented
- [ ] The commit contains one logical change

---

## Examples

### Feature

```text
feat(search): ✨ add fuzzy matching
```

### Bug fix

```text
fix(checkout): 🐛 prevent duplicate payment submission
```

### Critical hotfix

```text
fix(auth): 🚑️ restore token verification
```

### Security fix

```text
fix(api): 🔒️ sanitize redirect URLs
```

### Refactor

```text
refactor(database): ♻️ centralize transaction handling
```

### Performance

```text
perf(images): ⚡️ lazy-load gallery thumbnails
```

### Build

```text
build: 🔨 migrate from webpack to vite
```

### CI

```text
ci: 👷 run tests on Node.js 24
```

### Documentation

```text
docs(readme): 📝 add Windows installation steps
```

### Types

```text
refactor(api): 🏷️ replace response interfaces with schemas
```

### File movement

```text
refactor(cli): 🚚 move commands into feature modules
```

### Removal

```text
refactor(api): 🔥 remove deprecated v1 endpoints
```

### Breaking feature

```text
feat(config)!: 💥 require explicit environment selection

BREAKING CHANGE: The application no longer defaults to the development
environment. Set APP_ENV before starting the service.
```

### Revert

```text
revert: ⏪️ revert "✨ feat(search): add fuzzy matching"

This reverts commit 1a2b3c4d.
```

---

## Invalid Examples

Invalid:

```text
feat: Added login.
```

Problems:

- Missing Gitmoji
- Past tense
- Ends with a period

Correct:

```text
feat(auth): ✨ add login
```

Invalid:

```text
chore: 🐛 fix authentication bug
```

Problem:

- Gitmoji indicates a fix, but type says maintenance

Correct:

```text
fix(auth): 🐛 handle invalid credentials
```

Invalid:

```text
feat: ✨ update stuff
```

Problem:

- Description is vague

Correct:

```text
feat(profile): ✨ add avatar upload
```

Invalid:

```text
feat(api): 💥 change response format
```

Problem:

- A breaking change is implied by the Gitmoji but not declared conventionally

Correct:

```text
feat(api)!: 💥 change response format
```

---

## Repository Policy Overrides

Repository-specific rules take precedence when explicitly provided, including:

- Allowed commit types
- Required scopes
- Maximum subject length
- Emoji versus shortcode format
- Issue-reference format
- Signed-off-by requirements
- Release automation constraints

When no repository-specific rule exists, follow this skill.
