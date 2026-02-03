module.exports = {
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
}