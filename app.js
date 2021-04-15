// 导入express模块
const express = require('express')
// 创建express的服务器实例
const app = express()
// 调用app.listen方法，指定端口号并启动web服务器
app.listen(3001, function() {
    console.log('api server running at http://127.0.0.1:3001')
})