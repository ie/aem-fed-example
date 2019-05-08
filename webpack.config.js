// webpack.config.js
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

const finalJSOutput = 'dist/js/script.min.js';
const finalCSSOutput = 'dist/css/style.min.css';

const config = {
	  mode: 'development',
	  entry: './tools/css.js',
      devtool: 'source-map',
      node: {
        fs: 'empty'
      },
    // devtool: 'cheap-module-eval-source-map', // supposed to be fastest but doesnt work
	  output: {
      // If within normal JS framework environment,
      // use this to autogenerate hash
      // filename: '[name].[chunkhash].js'
	    filename: finalJSOutput,
	    // publicPath: './wpTheme',
	    path: path.resolve(__dirname, 'public')
	  },
	  module: {
	    rules: [
        { 
            test: /\.(woff|woff2|eot|ttf|svg|png)$/, 
            loader: 'url-loader',
            options: {
              limit: 8192,
              // name: '[name].[ext]',
              name: '[name]-[hash].[ext]',
              publicPath: '../assets/',
              outputPath: './dist/assets/',
              // emitFile: false
            }, 
            // inline base64 URLs for <=8k fonts/svgs, direct URLs for the rest
            // outputPath is relative to the module output path
            // publicPath is relative to the minified CSS ouptut (or file) that calls it
            // emitfile to be false if there is no need to recreate a file
            // by specifying name without the [hash], can output without using the auto hash system of webpack
            // otherwise it can be bundled together with auto hashing 
        },
        {
            test:/\.(s*)css$/, 
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              // This is the fallback if don't want to extract the CSS
              // {
              //   loader: "style-loader",
              // },
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                  // modules: true,
                  // localIdentName: "[local]___[hash:base64:5]"
                }
              },
              {
                 loader: 'postcss-loader',
                 options: {
                    plugins: () => [require('autoprefixer')]
                  }
              },
              {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
              }
            ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            },
            {
              loader: 'eslint-loader',
              options: {
                fix: true
              }
            }
          ]
        }
	    ],
	  }
 };


module.exports = (env, argv) => {
  // console.log(argv.mode);        // outputs development	
  if (argv.mode === 'development') {
  	config.plugins = [
      new WebpackShellPlugin({
        onBuildStart:['yarn start'],
        // onBuildEnd:['echo "Webpack End"']
      }),
      new MiniCssExtractPlugin({
        filename: finalCSSOutput
      }),
      new StyleLintPlugin({
        configFile: '.stylelintrc'
      }),
      new BrowserSyncPlugin( 
        {
          host: 'localhost',
          port: 3000,
          proxy: 'http://localhost:8080/'
        }
      )
    ]
  }

  if (argv.mode === 'production') {
  	config.mode = 'production';
    config.devtool = false,
    config.optimization = {
        minimizer: [
          new OptimizeCSSAssetsPlugin({})
        ]
    }
    config.plugins = [
        new MiniCssExtractPlugin({
          // If within normal JS framework environment,
          // use this to autogenerate hash
          // filename: 'style.[contenthash].css',
          filename: finalCSSOutput
        }),
        new OptimizeCSSAssetsPlugin({}),
        new MinifyPlugin()
    ]
  }

   return config;
};