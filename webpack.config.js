const path = require('path');

module.exports = {
  entry: './src/index.ts',
 // entry: {
  //  'index.js': './src/index.ts',
  //  'css/style.css': './src/assets/scss/style.scss' },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['ES2015', 'env']
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [{
          loader: 'css-loader'
      },
      {
          loader: 'sass-loader'
      }
  ]
/*
        use: [          
          'style-loader',          
          'css-loader',          
          'sass-loader',
        ],
        */
      },
    ],
  },
  resolve: {
     extensions: [ '.ts', '.js', '.scss', '.css' ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  //  path: __dirname + '/dist/',
  //  filename: '[name]'
    
  },
};