## Publish

- `package.json` is the source of truth and config (you don't need to bump the version here, it's handled in the CI)
- `.npmignore` takes care of the file structure that gets published

To publish, you tag and push a new version in this format `*.*.*` on the master branch.

```sh
git tag 0.4.2
git push origin 0.4.2
```

That's it!
