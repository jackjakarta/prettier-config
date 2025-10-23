import { type Config } from 'prettier';

/**
 * Available prettier plugins that can be automatically managed
 */
export const SUPPORTED_PLUGINS = {
  SORT_IMPORTS: '@ianvs/prettier-plugin-sort-imports',
  TAILWINDCSS: 'prettier-plugin-tailwindcss',
  PACKAGEJSON: 'prettier-plugin-packagejson',
} as const;

/**
 * Configuration options for import ordering
 */
export interface ImportOrderOptions {
  /** Whether to enable import sorting (default: true) */
  enabled?: boolean;
  /** Internal scopes for import organization (e.g., ['components', 'hooks']) */
  scope?: string | string[];
  /** Path aliases used in your project (e.g., ['@', '~']) */
  alias?: string[];
}

/**
 * Configuration options for the prettier config
 */
export interface PrettierConfigOptions {
  /** Import sorting configuration */
  order?: ImportOrderOptions;
  /** Enable Tailwind CSS plugin (default: false) */
  tailwind?: boolean;
  /** Enable package.json formatting plugin (default: false) */
  packageJson?: boolean;
  /** Extend or override any Prettier configuration option */
  extend?: Partial<Config> & {
    /** Additional plugins to include */
    plugins?: string[];
  };
}

/**
 * Create a Prettier configuration with intelligent defaults and customizable options
 *
 * @param options - Configuration options
 * @returns Complete Prettier configuration object
 *
 * @example
 * ```js
 * import defineConfig from '@jackjakarta/prettier-config';
 *
 * export default defineConfig({
 *   order: {
 *     enabled: true,
 *     scope: ['components', 'hooks'],
 *     alias: ['@', '~']
 *   },
 *   tailwind: true,
 *   extend: {
 *     printWidth: 120
 *   }
 * });
 * ```
 */
export default function defineConfig(options: Partial<PrettierConfigOptions> = {}): Config {
  const {
    tailwind = false,
    packageJson = false,
    order: { enabled: orderEnabled = false, scope = [], alias = [] } = {},
    extend: { plugins = [], ...extendConfig } = {},
  } = options;

  function getOrderOptions(): Partial<Config> {
    if (!orderEnabled) return {};

    const scopeOrder = (Array.isArray(scope) ? scope : [scope])
      .filter(Boolean)
      .map((s) => `^@${s}(/.*)`);

    const aliasOrder = alias.filter(Boolean).map((a) => `^${a}(.*)`);

    const importOrder: string[] = [
      '<BUILT_IN_MODULES>',
      '',
      '<THIRD_PARTY_MODULES>',
      '',
      ...aliasOrder,
      ...(aliasOrder.length > 0 ? [''] : []), // Add separator only if aliases exist
      ...scopeOrder,
      ...(scopeOrder.length > 0 ? [''] : []), // Add separator only if scopes exist
      '^[.]',
      '',
      '^(?!.*[.]css$)[./].*$',
      '.css$',
    ];

    return { importOrder };
  }

  return {
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    quoteProps: 'as-needed',
    jsxSingleQuote: false,
    trailingComma: 'all',
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'always',
    requirePragma: false,
    insertPragma: false,
    proseWrap: 'preserve',
    htmlWhitespaceSensitivity: 'strict',
    endOfLine: 'lf',
    embeddedLanguageFormatting: 'off',
    ...(tailwind ? { tailwindFunctions: ['clsx', 'cn', 'cva'] } : {}),
    ...getOrderOptions(),
    ...extendConfig,
    plugins: [
      ...(orderEnabled ? [SUPPORTED_PLUGINS.SORT_IMPORTS] : []),
      ...(tailwind ? [SUPPORTED_PLUGINS.TAILWINDCSS] : []),
      ...(packageJson ? [SUPPORTED_PLUGINS.PACKAGEJSON] : []),
      ...plugins,
    ],
  } satisfies Config;
}

/**
 * Create a preset configuration for common use cases
 */
export const presets = {
  /**
   * Configuration for Next.js projects using Tailwind CSS
   *
   * Default values:
   * - `tailwind`: true
   * - `order`: { enabled: true }
   * - `packageJson`: false
   * - `extend`: {}
   */
  nextjs: ({
    tailwind = true,
    order = { enabled: true },
    packageJson = false,
    extend = {},
  }: {
    tailwind?: boolean;
    order?: ImportOrderOptions;
    packageJson?: boolean;
    extend?: Partial<Config> & { plugins?: string[] };
  } = {}): Partial<PrettierConfigOptions> => ({
    tailwind,
    packageJson,
    order,
    extend,
  }),

  /**
   * Configuration for typical node.js projects
   *
   * Default values:
   * - `order`: { enabled: true }
   * - `packageJson`: false
   * - `extend`: {}
   */
  nodejs: ({
    order = { enabled: true },
    packageJson = false,
    extend = {},
  }: {
    order?: ImportOrderOptions;
    packageJson?: boolean;
    extend?: Partial<Config> & { plugins?: string[] };
  } = {}): Partial<PrettierConfigOptions> => ({
    packageJson,
    order,
    extend,
  }),
} as const;
