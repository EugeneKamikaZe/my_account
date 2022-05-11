const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const config = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.svg']
  },
  mode: NODE_ENV || 'development',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../public/account.1ci/react/dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: ['cache-loader', 'ts-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'cache-loader',
          MiniCssExtractPlugin.loader,
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]__[hash:base64:5]',
                auto: /\.module\.\w+$/i
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true
    })]
  },
  devServer: {
    port: 3008,
    open: true,
    hot: true,
    historyApiFallback: true
  },
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'source-map'
}

const configWithTimeMeasures = new SpeedMeasurePlugin({
  disable: !process.env.NODE_ENV
}).wrap(config)
configWithTimeMeasures.plugins.push(new MiniCssExtractPlugin())

if (NODE_ENV === 'production') {
  configWithTimeMeasures.plugins.push(
    new BundleAnalyzerPlugin({
      generateStatsFile: true
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/
    })
  )
}

module.exports = configWithTimeMeasures
