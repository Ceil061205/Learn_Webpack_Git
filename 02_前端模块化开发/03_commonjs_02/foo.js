const name = 'foo'
const age = 11
function say() {
  console.log('hhh');
}

// 少用
// exports.name = name
// 此时 module.exports === exports
module.exports.name = name
console.log(module.exports === exports);

// node导出本质是在导出module.exports对象
// 一般都如下, 此时 module.exports ！== exports 因为module.exports此时创建了一个新对象
module.exports = {
  name,
  age,
  say
}
