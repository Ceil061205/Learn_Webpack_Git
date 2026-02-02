const { name } = require('./utils')
console.log(name);

// 导入node提供的内置模块
const path = require('path')
console.log(path);


// 不是路径也不是核心模块 会从当前node_modules中找 如果没有就往上找
const why = require('why')
const axios = require('axios')
console.log(axios);

