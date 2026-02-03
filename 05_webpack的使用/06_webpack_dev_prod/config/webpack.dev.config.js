const path = require("path")
const { plugins } = require("./postcss.config")

// const { CleanWebpackPlugin } = require("clean-webpack-plugin")
// const { HtmlWebpackPlugin } 

module.exports = {
  mode: "development",
  // 入口
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    // path要绝对路径
    path: path.resolve(__dirname, './build'),
    assetModuleFilename: "abc.png"
  },
  resolve: {
      // 导入时可以省略后缀名
    extensions: [".js", ".json", ".vue"],
    // 嵌套层级深
    alias: {
      utils: path.resolve(__dirname, "./src/utils")
    }
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
        ]
      },
      {
        test: /\.less$/,
        use:[ "style-loader", "css-loader", "less-loader", "postcss-loader"]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        // 默认处理
        // type: "asset"
        // 复制到打包文件中进行重命名 将地址设置到img或者bgi中，多图片的网络请求 大图片用
        // type: "asset/resource"
        // 将图片进行base64编码，将编码后的源码放在打包的js文件中,少网络请求  但是会造成js文件过大，会阻塞  小图片用
        // type: "asset/inline"

        // 根据文件的大小进行打包方式的选择
        type: "asset",
        parser: {
          dataUrlCondiotion: {
            maxSize: 60 * 1024
          }
        },
        geneerator: [
          // 占位符
          // name原名
          // ext拓展名
          // hash webpack生成的 截取8位
          // img/ 先生成一个img的文件夹
          filename: "img/[name]_[hash:8].[ext]"
        ]
      },
      {
        test: '/\.js$/',
        use: [ 
          loader: "babel-loader",
          options: {
            plugins: [
              "babel/plugin-transform-arrow-function"
            ]
          }
        ]
      },
      {
        test: '/\.vue$/',
        loader: "vue-loader",
      }
    ]
  },
  // 热模块开启 核心作用：修改代码后，不刷新整个页面，只更新变化的模块
  devServer: {
    hot: true,
    // localhost
    host: 0.0.0.0,
    port: 9999,
    // 默认打开
    open: true,
    // 压缩
    // compress: true
  },
  plugins: [
    // new VueLoaderPlugin(),
    // new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin(),
    // new DefinePlugin() {
    //   BASE_URL: "'./'"
    // }
  ]
}