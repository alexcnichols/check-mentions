
# Check mentions

A GitHub Action to check mentions in issues and pull requests for misspellings by inferring from access to the repository.

<a href="https://github.com/alexcnichols/check-mentions/actions"><img alt="check-mentions status" src="https://github.com/alexcnichols/check-mentions/workflows/units-test/badge.svg"></a>

---

## Setup

**check-mentions** is a GitHub Actions that is designed to work using the [`issue_comment`](https://help.github.com/en/actions/reference/events-that-trigger-workflows#issue-comment-event-issue_comment) event.

### Preparations

If you're setting this workflow up within an organization-owned repository: [Create a new personal access token with the `read:org` scope](https://github.com/settings/tokens/new?scopes=read:org&description=check-mentions), copy it, and add it to the repository's secret store with the name `GITHUB_PERSONAL_TOKEN_ORG_READ`. The `GITHUB_TOKEN` that comes with GitHub Actions cannot read organization memberships.

### Workflow setup

Create a `.github/workflows/check-mentions.yml` file like this:

```yaml
name: Check issue comment mentions
on:
  issue_comment:
    types: [created]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: alexcnichols/check-mentions@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITHUB_PERSONAL_TOKEN_ORG_READ: ${{ secrets.GITHUB_PERSONAL_TOKEN_ORG_READ }}
```
