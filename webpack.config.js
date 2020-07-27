
const path = require('path');

module.exports = {    
    entry: './src/index.js',    
    output: {
      filename: 'main.js',
      publicPath: '/dist/',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        }
       ],
     },
    performance: { hints: false },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 8080,
      watchContentBase: true
    }    
  };