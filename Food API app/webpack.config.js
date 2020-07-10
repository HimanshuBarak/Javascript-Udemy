const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
      entry : ['babel-polyfill','./src/js/index.js'],
      output :{
          path: path.resolve(__dirname,'dist'),  // join the the current directory path(__dirname) to the location we want our bundle to be in'dist/js'
          filename : 'js/bundle.js'

      },
      devServer :{
          contentBase :'./dist'
      },
      plugins : [ new HtmlWebpackPlugin({
          filename : 'index.html',
          template : './src/index.html'      //starting file location
      })],

      module :{
          rules :[
              {
                  test: /\.js$/,   //finds the file ending with .js
                  exclude : /node_modules/,   //excludes the js files in node modules
                  use : {
                      loader : 'babel-loader'
                  }
              }
          ]
      }
};
    