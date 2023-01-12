import path from 'path';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { devMode, prodMode } from '../variables/_webpack-config-variables.mjs';
import moduleRules from '../objects/moduleRules.mjs';

const __dirname = 'E:/Xampp/htdocs/web-shop/Bicycle';

function genFilename(ext) {
  return devMode ? `[name].${ext}` : `[name].[contenthash].${ext}`;
}

function optimization() {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
  };

  if (prodMode)
    config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()];

  return config;
}

function useWebpackPlugins() {
  const base = [
    new HtmlWebpackPlugin({
      template: './pages/main/index.html',
      minify: {
        collapseWhitespace: prodMode,
      },
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: '../../../../pages/catalog/catalog.html',
      filename: 'catalog.html',
      minify: {
        collapseWhitespace: prodMode,
      },
      chunks: ['catalog'],
    }),
    new HtmlWebpackPlugin({
      template: './pages/login/index.html',
      filename: 'login.html',
      minify: {
        collapseWhitespace: prodMode,
      },
      chunks: ['login'],
    }),
    new HtmlWebpackPlugin({
      template: './pages/reassign/index.html',
      filename: 'reassign.html',
      minify: {
        collapseWhitespace: prodMode,
      },
      chunks: ['reassign'],
    }),
    new MiniCssExtractPlugin({
      filename: genFilename('css'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/php/'),
          to: path.resolve(__dirname, 'dist/assets/php/'),
        },
      ],
    }),
    new ESLintPlugin(),
  ];

  return base;
}

function buildModuleRules() {
  const rules = [
    moduleRules.htmlRules,
    moduleRules.styleRules,
    moduleRules.fontRules,
    moduleRules.imgRules,
    moduleRules.jsRules,
    moduleRules.videoRules,
    moduleRules.phpRules,
  ];

  return rules;
}

export { genFilename, optimization, useWebpackPlugins, buildModuleRules };
