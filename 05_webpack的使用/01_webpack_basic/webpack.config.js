const path = require("path")
module.exports = {
  // 入口
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    // path要绝对路径
    path: path.resolve(__dirname,'./build')
  }
}