import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'style-loader', // Adiciona CSS ao DOM
          'css-loader',   // Interpreta @import e url() como import/require
          'postcss-loader', // Processa CSS com PostCSS
          'sass-loader',   // Compila Sass para CSS
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
  },
};

export default config;