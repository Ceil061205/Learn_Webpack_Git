
const { UTIL_NAME, foo  } = require('./util')

console.log(UTIL_NAME, foo());


// require本质: 引用赋值 指向同一个对象
const bar = require('./bar')
console.log(bar.name);
setTimeout(() => {
  console.log(bar.name);
}, 2000)



