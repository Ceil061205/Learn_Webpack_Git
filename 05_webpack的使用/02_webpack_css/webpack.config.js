const path = require("path")
module.exports = {
  // 入口
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    // path要绝对路径
    path: path.resolve(__dirname,'./build')
  },
  module: {
    rules: [
      {
        // 告诉webpack匹配什么文件
        test: /\.css$/,
        use: [
          // 从后往前使用
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "postcss-loader" }
          // {
          //   // 加浏览器前缀
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         "autoprefixer"
          //       ]
          //     }
          //   }
          // },
        ]
        // 简写只有一个loader
        // loader: "style-loader"
        // 多个loader不需要其他属性时
        // use: [ "style-loader", "css-loader" ]
      },
      {
        test: /\.less$/,
        use:[ "style-loader", "css-loader", "less-loader", "postcss-loader"]
      }
    ]
  }
}