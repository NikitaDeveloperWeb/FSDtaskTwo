//modules
const path = require('path');
const fs = require('fs');
//plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//build state
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

//path
const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  assets: 'assets',
};

//pug pages
const PAGES_DIR_UIkit = `${PATHS.src}/pug/pages/UIkit`;
const PAGES_UIkit = fs.readdirSync(PAGES_DIR_UIkit).filter((fileName) => fileName.endsWith('.pug'));

const PAGES_DIR_Templates = `${PATHS.src}/pug/pages/Templates`;
const PAGES_Templates = fs
  .readdirSync(PAGES_DIR_Templates)
  .filter((fileName) => fileName.endsWith('.pug'));

//optimization
const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };
  if (isProd) {
    config.minimizer = [new OptimizeCssAssetsWebpackPlugin(), new TerserWebpackPlugin()];
  }
  return config;
};
//optimization filename
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

//styles loaders
const cssLoader = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {},
    },
    'css-loader',
  ];
  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['./index.js'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.png', '.pug', '.scss', 'jpg'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: isDev,
  },
  plugins: [
    ...PAGES_UIkit.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR_UIkit}/${page}`,
          filename: `./${page.replace(/\.pug/, '.html')}`,
        }),
    ),

    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('.css'),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: `${PATHS.src}/scss/fonts`, to: '/fonts' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
          },
        },
      },
      //styles
      {
        test: /\.css$/,
        use: cssLoader(),
        exclude: '/node_modules/',
      },
      {
        test: /\.scss$/,
        use: cssLoader('sass-loader'),
        exclude: '/node_modules/',
      },
      //image
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader'],
        exclude: '/node_modules/',
      },
      //fonts
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        use: ['file-loader'],
        exclude: '/node_modules/',
      },
      // //svg
      // {
      //   test: /\.svg$/,
      //   use: ['svg-loader'],
      //   exclude: '/node_modules/',
      // },
      //pug
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: '/node_modules/',
      },
    ],
  },
};
