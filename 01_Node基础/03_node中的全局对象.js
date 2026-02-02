// console.log(window);//没有

// 类似于Window的全局对象
console.log(global);

// 当前文件的目录结构
console.log(__dirname);

// 到文件
console.log(__filename);

console.log(module);
console.log(exports);
console.log(require);

console.log(process);

// setTimeout(() => {
  
// })
// setInterval()
// setImmediate(() => {
//   console.log('immm');
// })

// 额外执行函数
process.nextTick(() => {
  console.log('next');
})

console.log(globalThis === global);







