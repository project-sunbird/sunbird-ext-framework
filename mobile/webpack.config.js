const path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isTest = false;
var atlOptions = "";


module.exports = {
  entry: 'src/index.ts',
  devtool: 'source-map',
  context: __dirname,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    pathinfo: true,
    libraryTarget: 'umd',
  },
  resolve: {
    modules: ['.', 'src', 'node_modules'].map(x => path.join(__dirname, x)),
    extensions: ['.ts', '.js', 'scss', 'css', 'html'],
  },
  plugins: [
    new ExtractTextPlugin("bundle.css")
  ],
  module: {
    rules: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loaders: ['ts-loader?' + atlOptions, 'angular2-template-loader'],
        exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },

      // copy those assets to output
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
      },

      // Support for *.json files.
      {
        test: /\.json$/,
        loader: 'json-loader'
      }, 
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },

      // Support for CSS as raw text
      // use 'null' loader in test mode (https://github.com/webpack/null-loader)
      // all css in src/style will be bundled in an external css file
      // {
      //   test: /\.css$/,
      //   exclude: root('src', 'app'),
      //   loader: isTest ? 'null-loader' : ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: ['css-loader', 'postcss-loader']
      //   })
      // },
      // all css required in src/app files will be merged in js files
      // {
      //   test: /\.css$/,
      //   include: root('src', 'app'),
      //   loader: 'raw-loader!postcss-loader'
      // },

      // support for .scss files
      // use 'null' loader in test mode (https://github.com/webpack/null-loader)
      // all css in src/style will be bundled in an external css file
      // {
      //   test: /\.(scss|sass)$/,
      //   exclude: root('src', 'app'),
      //   loader: isTest ? 'null-loader' : ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: ['css-loader', 'postcss-loader', 'sass-loader']
      //   })
      // },
      // all css required in src/app files will be merged in js files
      // {
      //   test: /\.(scss|sass)$/,
      //   exclude: root('src', 'style'),
      //   loader: 'raw-loader!postcss-loader!sass-loader'
      // },

      // support for .html as raw text
      // todo: change the loader to something that adds a hash to images
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: root('src', 'public')
      }
    ]
  },
  externals: [
    'fs',
    'untildify',
    /^rxjs/,
    /^@angular/,
    /^@ng-bootstrap/,
    /^ionic-/,
    /^@ionic/,
    'ionicons',
    /^@ionic\/.+$/,
    /^ionic\/.+$/,
    /^ionic-\/.+$/,
  ]
}

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}