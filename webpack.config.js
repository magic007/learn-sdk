const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'sdk.js',
    path: path.resolve(__dirname, 'dist'),
  }
};