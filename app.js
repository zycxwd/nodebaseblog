const blogServeHandel = require('./src/router/blog')
const userServeHandel = require('./src/router/user')

// app.js抽离出www.js，app做更多的配置和业务代码和基本serve无关，www只负责serve相关
const serveHandel = (req, res) => {
  // process.env.NODE_ENV
  res.setHeader('Content-type', 'application/json')
  const method = req.method
  const url = req.url

  //req.path,供所有路由文件使用
  req.path = url.split('?')[0]
  const query = {}

  // 获取query
  for (const [name, value] of new URLSearchParams(url.split('?')[1])) {
    query[name] = value
  }
  //query赋值给res.query,供所有路由文件使用
  req.query = query

  // 路由文件相继使用 博客路由
  const blogData = blogServeHandel(req, res)
  if (blogData) {
    // 我们前面blog.js文件里返回的blogData就是个对象
    // 浏览器那边只接受字符串我们要转一下
    //设置contentType/application/json 浏览器又会以json解析
    res.end(JSON.stringify(blogData))
    return
  }

  //登录路由
  const userData = userServeHandel(req, res)
  if (userData) {
    console.log(1)
    res.end(JSON.stringify(userData))
    return
  }

  // 路由匹配不到处理
  res.writeHead(404, { 'content-type': 'text/plain' })
  res.write('404 NOT Found\n')
  res.end()
}

module.exports = serveHandel
