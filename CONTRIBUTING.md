# Contributing to lcdborg/lcdb.org (Live Concert Music Database)

This is a web application powering lcdb.org

## Commit Messages

Commit messages follow the [**Conventional Commits**](https://www.conventionalcommits.org/en/v1.0.0/) format:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

- Add `!` after type/scope for breaking changes or include `BREAKING CHANGE:` in the footer.
- Keep descriptions concise, imperative, lowercase, and without a trailing period.
- Reference issues/PRs in the footer when applicable.
- **ALL git commits MUST be made with `--signoff`.** This is mandatory.

### Attribution Requirements

AI agents must disclose what tool and model they are using in the "Assisted-by" commit footer:

```text
Assisted-by: [Model Name] via [Tool Name]
```

Example:

```text
Assisted-by: GLM 4.6 via Claude Code
```

## Local Development

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) with the Compose plugin (v2+)
- No global Node/yarn install required — everything runs inside containers

### Related repositories

This repo is the frontend only. The GraphQL backend lives at
[TomHAnderson/graphql.lcdb.org](https://github.com/TomHAnderson/graphql.lcdb.org)
and is a PHP/Laravel + Doctrine ORM service. Its production endpoint is
`https://graphql.lcdb.org/`.

### First-time setup

```bash
# 1. Copy the environment template
cp .env.local.dist .env.local
```

Edit `.env.local` and set `NEXT_PUBLIC_GRAPHQL_SERVER`:

| Scenario | Value |
|---|---|
| Frontend-only development (default) | `https://graphql.lcdb.org/` |
| Running the backend locally on Mac/Windows | `http://host.docker.internal/` |
| Running the backend locally on Linux | `http://172.17.0.1/` |

The production GraphQL endpoint (`https://graphql.lcdb.org/`) is publicly readable
without authentication. For most frontend work you can develop against it directly
and see real data immediately — no local backend or database setup required.

### Day-to-day workflow

```bash
# Start the dev server (http://localhost:3000)
docker compose up

# Source changes hot-reload automatically.

# Add a yarn package
docker compose run web yarn add <package>

# Stop
docker compose down
```

`node_modules` is kept in a named Docker volume so host and container binaries
never mix. The volume is created automatically on first run.

### Running the full backend locally

The GraphQL backend lives at
[TomHAnderson/graphql.lcdb.org](https://github.com/TomHAnderson/graphql.lcdb.org).
Clone it as a sibling directory (i.e. alongside this repo, not inside it), follow
its own setup instructions, then update `NEXT_PUBLIC_GRAPHQL_SERVER` in `.env.local`
to point at your local instance (see table above).

**Heads-up before you start** — the backend is more involved than a typical Laravel
project:

- **PHP 8.3+ required.** The project uses PHP attributes and other 8.x-only syntax;
  older PHP versions will fail silently or with confusing errors.
- **Doctrine ORM, not Eloquent.** This is a Data Mapper stack, not Active Record.
  If you are only familiar with standard Laravel/Eloquent patterns, budget time to
  learn Doctrine basics before trying to change schema or queries.
- **Entity metadata is XML, not attributes.** Schema definitions live in
  `config/doctrine-orm-metadata/` as XML files. Editing them by hand is error-prone;
  the project uses [Skipper](https://skipper18.com/) as a visual editor. You can
  edit without Skipper, but be careful.
- **Docker is needed for a production-like setup** (MySQL 8 + Redis). The repo also
  ships a `.env.dev` that uses SQLite — useful for getting GraphiQL up quickly
  without Docker, but it may not reflect the production database behaviour exactly.
- **The database starts empty.** `php artisan doctrine:schema:create` builds the
  schema from entities, but there is no production data dump available. You will be
  working against a structurally correct but unpopulated database unless you load
  fixtures or seed data yourself.
- **`composer test` is comprehensive.** It runs parallel-lint, PHPCS, Psalm, and
  PHPUnit in sequence. All four must pass before a PR will be accepted. Run it early
  and often.

## Submitting a Pull Request

This repository does not grant contributors direct push access. All changes come
in via a personal fork.

```bash
# 1. Fork the repo to your own GitHub account (one-time)
gh repo fork lcdborg/lcdb.org --clone=false

# 2. Add your fork as a remote (one-time, replace YOUR_USERNAME)
git remote add fork https://github.com/YOUR_USERNAME/lcdb.org.git

# 3. Create a branch for your work
git checkout -b feat/my-change

# 4. Make commits (remember: --signoff is mandatory, see Commit Messages above)

# 5. Push to your fork
git push fork feat/my-change

# 6. Open a PR against lcdborg/lcdb.org main
gh pr create --repo lcdborg/lcdb.org --head YOUR_USERNAME:feat/my-change --base main
```

All CI checks (currently: `yarn build`) must pass before a PR will be reviewed.

## Good First Issues

TODO: label a set of starter issues on this repo and link to them here. Something like:

```
https://github.com/lcdborg/lcdb.org/issues?q=is%3Aopen+label%3A%22good+first+issue%22
```

Until then, read the codebase, try the live site at [lcdb.org](https://lcdb.org),
and look for rough edges — missing pages, inconsistent UI, or anything that looks
incomplete compared to [etreedb.org](https://etreedb.org).

## Community Guidelines

TODO: adopt a formal code of conduct. Options used by similar projects include:

- **A `CODE_OF_CONDUCT.md` in the repo root** — write your own or adapt a template.
  Keeps everything in one place and is referenced automatically by GitHub.
- **[Contributor Covenant](https://www.contributor-covenant.org/)** — the most
  widely used standard; a one-page pledge covering harassment, enforcement, and
  scope. Free to adopt verbatim.
- **[CNCF Code of Conduct](https://github.com/cncf/foundation/blob/main/code-of-conduct.md)** —
  similar in spirit to the Covenant, used by many large open-source foundations.

Whichever is chosen, it should name a contact address for reporting issues.

## Github CLI (gh)

We have access to the `gh` command line tool for accessing github on this machine.

## Deploying to Production

TODO

See (TODO: make this file) **`docs/deploying.md`** for the full deployment workflow. The short version:

TODO: write super brief steps here.

## Key Conventions

- use of "TODO" or "FIXME" in any markdown file marks a known gap. Closing these gaps should be done as their own separate commits where possible.
- **Defensive First**: Presume that actors with ill intent (or humans with sufficiently advanced incompetence so as to be indistinguishable from malice)
  have and will again attack this software. Always add tests for bug fixes. Consider adversarial inputs.
- **Learner Friendly**: Students have and will again work on this code. Support them in your style and comment choices.
- **F/LOSS is good**: It is a core commitment that we choose the more free of the software choices, even at a cost of features or performance.


