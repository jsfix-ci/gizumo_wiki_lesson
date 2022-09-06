import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import legacy from '@vitejs/plugin-legacy';
import checker from 'vite-plugin-checker';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [
    createVuePlugin(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    // checker({
    //   eslint: {
    //     lintCommand: 'eslint "js/**/*.{js,vue}"'
    //   },
    // }),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@Components': `${__dirname}/src/js/components`,
      '@Helpers': `${__dirname}/src/js/_helpers`,
      '@Pages': `${__dirname}/src/js/pages`,
      '@Scss': `${__dirname}/src/scss`,
    },
  },
  css: {
    postcss: {
      plugins: [
        require('autoprefixer'),
      ],
    },
  },
  server: {
    open: true,
    port: 8000,
  },
});
