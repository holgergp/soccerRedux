var path = require('path');
var srcPath = path.join(__dirname, '/../src/');

module.exports = {
  //devtool: 'eval',
  devtool: 'inline-source-map',
  module: {

    noParse: [
      /node_modules\/sinon\//,
    ],
    loaders: [
      {
        test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl)$/,
        loader: 'null-loader'
      },
      {
        test: /\.(js|jsx)$/,
        //loader: 'babel-loader',
        loader: 'babel',
        exclude: /\/node_modules\//
        //include: [
        //  path.join(__dirname, '/../src'),
        // path.join(__dirname, '/../test')
        //]
      },
      {test: /\.json$/, loaders: ['json']},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      actions: srcPath + 'actions/',
      helpers: path.join(__dirname, '/../test/helpers'),
      components: srcPath + 'components/',
      sources: srcPath + 'sources/',
      stores: srcPath + 'stores/',
      styles: srcPath + 'styles/',
      'sinon': 'sinon/pkg/sinon'
    }
  }
};
