
const path = require('path');

module.exports = {    
    entry: './src/main.js',    
    output: {
      filename: 'main.js',
      publicPath: '/dist/',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [{
            loader:'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }            
          }]
        },
        {
          test: /\.fx$/i,
          use: 'raw-loader',
        },  
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ],
        },                      
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
  