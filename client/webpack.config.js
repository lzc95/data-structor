const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");  //从js中分离css
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    entry: {
      index: path.join(__dirname,'src/index.js')
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/[name].js'
    },
    devtool: '#source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [
        path.resolve('src'),
        path.resolve('node_modules')
      ],
      alias: {
        '@': path.resolve('src'),
      }
    },
    module: {
      rules: [
        {
          test: /(\.jsx|\.js)$/, //匹配jsx和js结尾的文件
          use: {
              loader: 'babel-loader',
              // 当loader传入的参数过多时，可以添加options对象
              options: {
                  cacheDirectory: true //cacheDirectory用于缓存babel的编译结果,加快重新编译的速度
              }
          },
          include: path.join(__dirname,'src') 
        },
        {
          test: /.css$/,
          use: ['style-loader','css-loader'] //调用loader时是从右到左编译的。
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader',
            }, 
            {
             loader: 'css-loader', // translates CSS into CommonJS
            }, 
            {
              loader: 'less-loader', // compiles Less to CSS
              options: {
                modifyVars: {
                  'primary-color': '#169866',
                  'link-color': '#1DA57A',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true,
              }
           }
            ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname,'./src/index.tmpl.html')
      }),
      new MiniCssExtractPlugin({
        filename: "css/style.css",
        chunkFilename: "[id].css"
      }),
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'server',
      //   analyzerHost: '127.0.0.1',
      //   analyzerPort: 8889,
      //   reportFilename: 'report.html',
      //   defaultSizes: 'parsed',
      //   openAnalyzer: true,
      //   generateStatsFile: false,
      //   statsFilename: 'stats.json',
      //   statsOptions: null,
      //   logLevel: 'info'
      // })
    ],
    devServer: {
      contentBase: path.join(__dirname, './dist'),  //服务器读取文件目录
      port: 8082,  //运行的端口号
      inline: true, // 文件修改后实时刷新
      historyApiFallback: true,  //设为true,所有的页面都将跳转到index.html
      proxy: {
        '/api': {
          target: 'http://localhost:8080/', // 设置你调用的接口域名和端口号
          changeOrigin: true,     // 跨域
          pathRewrite: {
            '^/api': ''
          }
        }
      }  
  }
}