function par() {
  console.log('111');
}

// 默认导出没有名字
// export default par
// 一个文件只能有一个默认导出
export default function() {
  console.log('111');
}