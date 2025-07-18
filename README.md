# @jackjakarta/prettier-config

A modern, type-safe Prettier configuration with intelligent import sorting and customizable options.

## Features

- 📦 **Smart import sorting** - Automatic import organization with `@ianvs/prettier-plugin-sort-imports`
- 🔧 **Fully configurable** - Customize import order, scopes, and aliases with TypeScript support
- 🚀 **Zero config** - Works out of the box with minimal setup
- 📝 **TypeScript-first** - Full type safety and IntelliSense
- 🎨 **Tailwind CSS support** - Built-in integration with `prettier-plugin-tailwindcss`
- 📋 **Package.json formatting** - Sorting and formatting of `package.json` with `prettier-plugin-packagejson`
- 🏗️ **Presets included** - Ready-to-use configurations for Next.js, and more

## Installation

```bash
# npm
npm install -D @jackjakarta/prettier-config

# pnpm (recommended)
pnpm add -D @jackjakarta/prettier-config

# yarn
yarn add -D @jackjakarta/prettier-config
```

_Newer versions of package managers like `pnpm@^10.0.0` will not automatically install dependencies or peer dependencies so you have manually install the plugins as well as `prettier@^3.0.0`._

```bash
pnpm add -D prettier @ianvs/prettier-plugin-sort-imports prettier-plugin-tailwindcss prettier-plugin-packagejson
```

## Quick Start

### Basic Usage

Create a `prettier.config.js` file in your project root:

```javascript
import defineConfig from '@jackjakarta/prettier-config';

// This is the default config with no plugins enabled
export default defineConfig();
```

### Using Presets

```javascript
import defineConfig, { presets } from '@jackjakarta/prettier-config';

// Customizable preset for next.js projects
export default defineConfig(presets.nextjs({
  tailwind: true,
  importSorting: true,
  packageJson: false,
}));

// All plugins enabled
export default defineConfig(presets.full());

// Minimal setup with only import sorting
export default defineConfig(presets.minimal());
```

### Custom Configuration

```javascript
import defineConfig from '@jackjakarta/prettier-config';

export default defineConfig({
  order: {
    enabled: true,
    scope: ['components', 'hooks', 'utils', 'lib'],
    alias: ['@', '~', '#'],
  },
  tailwind: true,
  extend: {
    printWidth: 120,
    semi: false,
    plugins: ['prettier-plugin-organize-attributes'], // Add additional plugins
  },
});
```

### Options

#### `order`

Configure import sorting behavior:

- **`enabled`** (boolean, default: `true`) - Enable/disable import sorting
- **`scope`** (string | string[], default: `[]`) - Internal scopes for import organization
- **`alias`** (string[], default: `[]`) - Path aliases used in your project

#### `extend`

Extend or override any Prettier configuration option.

## Default Configuration

```javascript
{
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  requirePragma: false,
  insertPragma: false,
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "strict",
  endOfLine: "lf",
  embeddedLanguageFormatting: "off",
}
```

## Import Order

When import sorting is enabled, imports are organized in the following order:

1. Built-in Node.js modules
2. Third-party packages
3. Path aliases (configured via `alias` option)
4. Internal scopes (configured via `scope` option)
5. Relative imports
6. CSS imports (always last)

## Usage Examples

### React Project with TypeScript

```javascript
// prettier.config.js
import defineConfig from '@jackjakarta/prettier-config';

export default defineConfig({
  order: {
    enabled: true,
    scope: ['components', 'hooks', 'utils', 'types'],
    alias: ['@', '~'],
  },
  extend: {
    plugins: ['prettier-plugin-tailwindcss'],
  },
});
```

### Monorepo Setup

```javascript
// prettier.config.js
import defineConfig from '@jackjakarta/prettier-config';

export default defineConfig({
  order: {
    enabled: true,
    scope: ['packages', 'apps', 'libs'],
    alias: ['@workspace', '@shared'],
  },
  extend: {
    printWidth: 120,
  },
});
```

## Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check .",
  }
}
```

## Editor Integration

### VS Code

Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and add to your settings:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

## Peer Dependencies

This package requires Prettier 3.0.0 or higher:

```json
{
  "peerDependencies": {
    "prettier": "^3.0.0"
  }
}
```

## License

ISC

## Contributing

Issues and pull requests are welcome!
