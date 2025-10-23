// Example configurations using the modern prettier config

import defineConfig, { presets } from '@jackjakarta/prettier-config';

// 1. Basic usage with zero configuration (no plugins)
export const basicConfig = defineConfig();

// 2. Using presets for common setups
export const nextjsConfig = defineConfig(presets.nextjs());
export const minimalConfig = defineConfig(presets.nodejs());

// 3. Custom configuration with all options
export const customConfig = defineConfig({
  order: {
    enabled: true,
    scope: ['components', 'hooks', 'utils', 'lib', 'types'],
    alias: ['@', '~', '#'],
  },
  tailwind: true,
  packageJson: true,
  extend: {
    printWidth: 120,
    semi: false,
    singleQuote: false,
    plugins: ['prettier-plugin-organize-attributes'],
  },
});

// 4. Configuration for a monorepo
export const monorepoConfig = defineConfig({
  order: {
    enabled: true,
    scope: ['packages', 'apps', 'shared'],
    alias: ['@workspace', '@shared'],
  },
  extend: {
    printWidth: 100,
    plugins: ['prettier-plugin-packagejson'],
  },
});

// 5. Minimal setup with just import sorting
export const importOnlyConfig = defineConfig({
  order: {
    enabled: true,
    scope: [],
    alias: [],
  },
  tailwind: false,
  extend: {},
});

// 6. Tailwind-focused configuration
export const tailwindConfig = defineConfig({
  tailwind: true,
  order: {
    enabled: true,
    scope: ['components'],
    alias: ['@'],
  },
  extend: {
    tailwindFunctions: ['clsx', 'cn', 'cva'],
  },
});
