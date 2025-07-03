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

  if (process.env.NODE_ENV !== 'production') {
    const warnings = validatePlugins(orderEnabled, tailwind, packageJson);
    warnings.forEach((warning) => console.warn(`[@jackjakarta/prettier-config]: ${warning}`));
  }

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

  /**
   * Validates that required plugins are available
   * @internal
   */
  function validatePlugins(
    orderEnabled: boolean,
    tailwind: boolean,
    packageJson: boolean,
  ): string[] {
    const warnings: string[] = [];

    if (orderEnabled) {
      try {
        require.resolve(SUPPORTED_PLUGINS.SORT_IMPORTS);
      } catch {
        warnings.push(
          `Import sorting is enabled but ${SUPPORTED_PLUGINS.SORT_IMPORTS} is not installed. Run: npm install -D ${SUPPORTED_PLUGINS.SORT_IMPORTS}`,
        );
      }
    }

    if (tailwind) {
      try {
        require.resolve(SUPPORTED_PLUGINS.TAILWINDCSS);
      } catch {
        warnings.push(
          `Tailwind CSS formatting is enabled but ${SUPPORTED_PLUGINS.TAILWINDCSS} is not installed. Run: npm install -D ${SUPPORTED_PLUGINS.TAILWINDCSS}`,
        );
      }
    }

    if (packageJson) {
      try {
        require.resolve(SUPPORTED_PLUGINS.PACKAGEJSON);
      } catch {
        warnings.push(
          `Package.json formatting is enabled but ${SUPPORTED_PLUGINS.PACKAGEJSON} is not installed. Run: npm install -D ${SUPPORTED_PLUGINS.PACKAGEJSON}`,
        );
      }
    }

    return warnings;
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
   * Configuration for Next.js projects
   *
   * Default values:
   * - `tailwind`: true
   * - `importSorting`: true
   * - `packageJson`: false
   */
  nextjs: ({
    tailwind = true,
    importSorting = true,
    packageJson = false,
  }: {
    tailwind?: boolean;
    importSorting?: boolean;
    packageJson?: boolean;
  } = {}): Partial<PrettierConfigOptions> => ({
    tailwind,
    packageJson,
    order: {
      enabled: importSorting,
    },
  }),

  /**
   * Full configuration with all features enabled
   */
  full: (): Partial<PrettierConfigOptions> => ({
    tailwind: true,
    packageJson: true,
    order: {
      enabled: true,
    },
  }),

  /**
   * Minimal configuration with just import sorting
   */
  minimal: (): Partial<PrettierConfigOptions> => ({
    order: {
      enabled: true,
    },
  }),
} as const;
