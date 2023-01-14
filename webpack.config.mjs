import path from 'path';
import { fileURLToPath } from 'url';
import {
  mode,
  target,
  devtool,
} from './src/js/modules/webpack/variables/_webpack-config-variables.mjs';
import {
  genFilename,
  optimization,
  useWebpackPlugins,
  buildModuleRules,
} from './src/js/modules/webpack/functions/_webpack-config-funcs.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  context: path.resolve(__dirname, 'src'),

  entry: {
    main: ['@babel/polyfill', '@main/script.mjs'],
    login: ['@babel/polyfill', '@login/script.mjs'],
    catalog: ['@babel/polyfill', '@catalog/script.mjs'],
    reassign: ['@babel/polyfill', '@reassign/script.mjs'],
    teststatus: ['@babel/polyfill', '@teststatus/script.mjs'],
    overview: ['@babel/polyfill', '@overview/script.mjs'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: genFilename('js'),
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@main': path.resolve(__dirname, 'src/pages/main'),
      '@login': path.resolve(__dirname, 'src/pages/login'),
      '@catalog': path.resolve(__dirname, 'src/pages/catalog'),
      '@reassign': path.resolve(__dirname, 'src/pages/reassign'),
      '@overview': path.resolve(__dirname, 'src/pages/overview'),
      '@teststatus': path.resolve(__dirname, 'src/pages/teststatus'),
      '@html-modules': path.resolve(__dirname, 'src/html/modules'),
      '@scss-modules': path.resolve(__dirname, 'src/scss/modules'),
      '@js-modules': path.resolve(__dirname, 'src/js/modules'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
    },
  },

  optimization: optimization(),

  plugins: useWebpackPlugins(),

  module: {
    rules: buildModuleRules(),
  },
};
