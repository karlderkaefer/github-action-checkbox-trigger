<p align="center">
  <a href="https://github.com/karlderkaefer/github-action-checkbox-trigger/actions"><img alt="typescript-action status" src="https://github.com/karlderkaefer/github-action-checkbox-trigger/workflows/build-test/badge.svg"></a>
</p>

# Checkbox Trigger Action

This action will check or uncheck a checkbox in pull request description. Also it can be used to run tests on conditionals.

## Code in Main

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Publish

Actions are run from GitHub repos so we will checkin the packed dist folder. On main branch perform:
```bash
npm run build
npm run package
git commit -a -m "update dist"
git push origin main
# increment release number
gh release create
```

