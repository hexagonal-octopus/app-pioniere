var path = require('path');
var webpack = require('webpack');

module.exports = {
   mode: 'none',
   entry:{
      App:  './src/assets/scripts/App.js',
      Login: './src/assets/scripts/Login.js'
   },
   output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'src/temp/scripts')
   },
   module: {
      rules: [
         {
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['env']
               }
            },
            test: /\.js$/,
            exclude: [/(node_modules|bower_components)/, path.resolve(__dirname, 'src/assets/scripts/components')]
         }
      ]
   },
   plugins: [
      new webpack.ProvidePlugin({
         $: 'jquery',
         jQuery: 'jquery',
         jquery: 'jquery',
         'window.jQuery': 'jquery'
      })
   ]
}