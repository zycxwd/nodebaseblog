const blogServeHandel = require('./src/router/blog')
const userServeHandel = require('./src/router/user')
const query_string = require('./src/util/querystring')

function getPostdata(req) {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let propsData = ''
    req.on('data', (chunk) => {
      propsData += chunk.toString()
    })
    req.on('end', () => {
      if (!propsData) {
        resolve({})
        return
      }
      resolve(JSON.parse(propsData))
    })
  })
  return promise
}
// app.js抽离出www.js，app做更多的配置和业务代码和基本serve无关，www只负责serve相关
const serveHandel = (req, res) => {
  // process.env.NODE_ENV
  res.setHeader('Content-type', 'application/json')
  const url = req.url

  //req.path,供所有路由文件使用
  req.path = url.split('?')[0]
  req.query = query_string(url)

  //处理post请求的参数  获取postdata
  getPostdata(req).then((postdata) => {
    req.body = postdata

    // 路由文件相继使用 博客路由
    // const blogData = blogServeHandel(req, res)
    // if (blogData) {
    //   // 我们前面blog.js文件里返回的blogData就是个对象
    //   // 浏览器那边只接受字符串我们要转一下
    //   //设置contentType/application/json 浏览器又会以json解析
    //   res.end(JSON.stringify(blogData))
    //   return
    // }
    const blogResult = blogServeHandel(req, res)
    if (blogResult) {
      blogResult.then((blogData) => {
        res.end(JSON.stringify(blogData))
      })
      return
    }

    //登录路由
    const userData = userServeHandel(req, res)
    if (userData) {
      res.end(JSON.stringify(userData))
      return
    }

    // 路由匹配不到处理
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.write('404 NOT Found\n')
  })
}

module.exports = serveHandel
