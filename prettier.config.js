import defineConfig from './dist/index.js';

export default defineConfig({
  order: {
    enabled: true,
    scope: ['src'],
    alias: [],
  },
  extend: {
    // Keep the default settings for this project
  },
});
