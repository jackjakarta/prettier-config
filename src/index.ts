type Options = {
  order: {
    enabled?: boolean;
    scope?: string | string[];
    alias?: string[];
  };
  extend: { plugins: string[] } & Record<string, unknown>;
};

export default function defineConfig(options: Partial<Options> = {}) {
  const {
    order: { scope = [], enabled: orderEnabled = true, alias = [] } = {},
    extend: { plugins = [], ...extend } = {},
  } = options;

  function getOrderOptions() {
    if (!orderEnabled) return {};

    const scopeOrder = (Array.isArray(scope) ? scope : [scope]).map((scope) => `^@${scope}(/.*)`);

    const aliasOrder = alias.map((alias) => `^${alias}(.*)`);
    return {
      importOrder: [
        '<BUILT_IN_MODULES>',
        '',
        '<THIRD_PARTY_MODULES>',
        '',
        ...aliasOrder,
        '',
        ...scopeOrder,
        '',
        '^[.]',
        '',
        '^(?!.*[.]css$)[./].*$',
        '.css$',
      ],
    };
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
    ...extend,

    plugins: [...(orderEnabled ? ['@ianvs/prettier-plugin-sort-imports'] : []), ...plugins],
  };
}
