const path = require('path');
const { VueLoaderPlugin } = require( 'vue-loader' )
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'

const config = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  module: {
        rules: [
            {
                    test: /\.vue$/,
                    loader: 'vue-loader'
            },
            {
                    test: /\.css$/,
                    use: [
                    'style-loader',
                    'css-loader'
                    ]
            },
            {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
            },
            {
                    test: /\.(csv|tsv)$/,
                    use: [
                    'csv-loader'
                    ]
            },
            {
                    test: /\.xml$/,
                    use: [
                    'xml-loader'
                    ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env' : {
                NODE_ENV : isDev ? '"development"' : '"production"'
            }
        }),
        new HtmlWebpackPlugin(),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
};

if (isDev) {
    config.devServer = {
        port: 2022,
        host: '0.0.0.0',
        overlay: {
            errors: true,
        },
        hot: true
    }
    config.devtool = '#cheap-module-eval-source-map'
}

module.exports = config
