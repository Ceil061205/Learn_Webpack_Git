// import要在顶层导入 不允许在逻辑代码中编写
// import parse from "./parse";
// parse()

let flag = true
if (flag) {
  // 若需要则
  import('./foo.js').then(res => {
    console.log(res.name);
  })
}