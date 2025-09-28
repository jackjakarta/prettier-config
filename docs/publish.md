## Developers

To publish a new version to `npm`, first make sure you are logged in.

```sh
pnpm login
```

Then you have to build the library.

> Make sure you bump the version in `package.json` first.

```sh
pnpm build
```

Then you just have to publish it.

- `package.json` is the source of truth and config
- `.npmignore` takes care of the file structure

```sh
pnpm publish
```

That's it!
