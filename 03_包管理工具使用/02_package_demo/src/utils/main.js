// pack.json 用来记录各种信息
// npm init -y 默认配置

// scripts 里面是脚本 start test stop restart 允许省略run   npm start
// package.json中有记录版本信息 直接运行npm i

// npm i xxx -D 开发依赖

// peer依赖 是以什么为前提的依赖

// ~x.y.z版本xy不变y装最新的 ^x.y.z标识x不变 不加任何符号表示明确版本

// 即使下面不是index.js  有packjson配置也可
import { why } = require('why')
