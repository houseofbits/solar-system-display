
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
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env',
                        '@babel/react',{
                        'plugins': ['@babel/plugin-proposal-class-properties']}]
            }             
          },         
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ],
        }, 
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
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
  