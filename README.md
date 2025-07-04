# @jackjakarta/prettier-config

A modern, type-safe Prettier configuration with intelligent import sorting and customizable options.

## Features

- 🎯 **Sensible defaults** - Production-ready Prettier configuration
- 📦 **Smart import sorting** - Automatic import organization with `@ianvs/prettier-plugin-sort-imports`
- 🔧 **Fully configurable** - Customize import order, scopes, and aliases with TypeScript support
- 🚀 **Zero config** - Works out of the box with minimal setup
- 📝 **TypeScript-first** - Full type safety and IntelliSense
- 🎨 **Tailwind CSS support** - Built-in integration with `prettier-plugin-tailwindcss`
- ⚡ **Modern ESM/CJS** - Dual package exports for maximum compatibility
- 🏗️ **Presets included** - Ready-to-use configurations for React, Next.js, and more

## Installation

```bash
# npm
npm install -D @jackjakarta/prettier-config prettier

# pnpm (recommended)
pnpm add -D @jackjakarta/prettier-config prettier

# yarn
yarn add -D @jackjakarta/prettier-config prettier
```

> **Note**: Prettier 3.0+ is required as a peer dependency.

## Quick Start

### Basic Usage

Create a `prettier.config.js` file in your project root:

```javascript
import defineConfig from '@jackjakarta/prettier-config';

export default defineConfig();
```

### Using Presets

```javascript
import defineConfig, { presets } from '@jackjakarta/prettier-config';

// For Next.js projects
export default defineConfig(presets.nextjs());

// All features enabled
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
    plugins: ['prettier-plugin-organize-attributes'],
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

Extend or override any Prettier configuration option:

```javascript
extend: {
  printWidth: 120,
  semi: false,
  singleQuote: false,
  plugins: ['prettier-plugin-tailwindcss'], // Add additional plugins
}
```

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

### Example

```javascript
// Before
import './styles.css';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { utils } from '@utils/helpers';
import lodash from 'lodash';
import { config } from '../config';

// After
import { useState } from 'react';

import lodash from 'lodash';

import { Button } from '@/components/Button';

import { utils } from '@utils/helpers';

import { config } from '../config';

import './styles.css';
```

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

### Disable Import Sorting

```javascript
// prettier.config.js
import defineConfig from '@jackjakarta/prettier-config';

export default defineConfig({
  order: {
    enabled: false,
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
    "lint": "eslint . && prettier --check ."
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

Issues and pull requests are welcome! Please check the [issues page](https://github.com/titanom/prettier-config/issues) before creating a new one.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.
