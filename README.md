
<p align="center">
  <a href="https://github.com/alexcnichols/check-mentions/actions"><img alt="check-mentions status" src="https://github.com/alexcnichols/check-mentions/workflows/units-test/badge.svg"></a>
</p>

# Check mentions

A GitHub Action to check mentions in issues and pull requests for misspellings by inferring from access to the repository.

## Code in master branch

Install the dependencies  
```bash
$ npm install
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  ./parse-comment.test.js
  ✓ parses 1 matching username (1ms)
  ✓ fails to parse mis-typed username (1ms)
  ✓ parses 2 matching usernames

...
```

## Package for distribution

GitHub Actions will run the entry point from the action.yml. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos.  Packaging the action will create a packaged action in the dist folder.

Run package

```bash
npm run package
```

Since the packaged index.js is run from the dist folder.

```bash
git add dist
```

## Create a release branch

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```bash
$ git checkout -b v1
$ git commit -a -m "v1 release"
```

```bash
$ git push origin v1
```

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Usage

You can now consume the action by referencing the v1 branch

```yaml
uses: alexcnichols/javascript-action@v1
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  GITHUB_PERSONAL_TOKEN: ${{ secrets.GITHUB_PERSONAL_TOKEN }}
```

See the [actions tab](https://github.com/alexcnichols/check-mentions/actions) for runs of this action! :rocket:
