const blogServeHandel = require('./src/router/blog')
const userServeHandel = require('./src/router/user')
const query_string = require('./src/util/querystring')
const { get, set } = require('./src/db/redis')
//session解决cookie的暴露敏感数据问题
//设置全局session对象
// const SESSION_DATA = {}redis取代
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
  // if ((req.url = '/favicon.ico')) return
  if (req.url === '/favicon.ico') return //阻止favicon自动请求不知道别的方法
  // process.env.NODE_ENV
  res.setHeader('Content-type', 'application/json')
  const url = req.url
  //req.path,供所有路由文件使用
  req.path = url.split('?')[0]
  req.query = query_string(url)
  //获取cookie
  const headercookie = req.headers.cookie || ''
  req.cookie = {}
  headercookie.split(';').forEach((e) => {
    if (!e) return
    const arr = e.split('=')
    req.cookie[arr[0]] = arr[1]
  })
  //获取session
  //在req.cookie里在设置一个sessionId通过这个sessionId来做session
  //在 SESSION_DATA 里面也设置一个sessionId
  //给 req在设置一个session属性
  // let needCookie = false //是否需要设置cookie
  // let sessionId = req.cookie.sessionId
  // if (sessionId) {
  //   if (!SESSION_DATA[sessionId]) {
  //     // SESSION_DATA制空  后面要给他加属性 初始化这个SESSION_DATA
  //     SESSION_DATA[sessionId] = {}
  //   }
  // } else {
  //   needCookie = true
  //   sessionId = `${Date.now()}_ ${Math.random()}`
  //   SESSION_DATA[sessionId] = {}
  // }
  // req.session = SESSION_DATA[sessionId]

  //获取 session通过redis
  let needCookie = false //是否需要设置cookie
  let sessionId = req.cookie.sessionId
  // req.session = SESSION_DATA[sessionId]
  // 为了避免多次重复设置加 的判断 最终都是为了能用req.session给他加username
  if (!sessionId) {
    needCookie = true
    sessionId = `${Date.now()}_ ${Math.random()}`
    set(sessionId, {})
  }
  //只是为了给redis复制 附上空对象就行赋给req.session后边就能取username了
  get(sessionId)
    .then((sessionData) => {
      //正常开始这个sessionData就是个空对象就对了
      // if (sessionData == null) {
      //   //初始化redis存的key是sessionId的值也就是key是`${Date.now()}_ ${Math.random()}`
      //   set(req.sessionId, {})
      //   req.session = {}
      // } else {
      //   req.session = sessionData|| {}

      // }
      //正常开始这个sessionData就是个空对象就对了
      //登陆过同步过redis后 这个sessionData里面有了username和realname属性
      if (sessionData == null) set(sessionId, {})
      req.session = sessionData || {}
      console.log('req.session', req.session)
      // 直接return getPostdata
      return getPostdata(req)
    })
    .then((postdata) => {
      // getPostdata要干的事
      //处理post请求的参数  获取postdata
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
          if (needCookie) {
            res.setHeader(
              'Set-Cookie',
              `sessionId=${sessionId};path=/;httpOnly`
            )
          }
          res.end(JSON.stringify(blogData))
        })
        return
      }

      //登录路由
      const userResult = userServeHandel(req, res)
      if (userResult) {
        userResult.then((data) => {
          console.log('needCookie', needCookie)
          if (needCookie) {
            res.setHeader(
              'Set-Cookie',
              `sessionId=${sessionId};path=/;httpOnly`
            )
          }
          res.end(JSON.stringify(data))
        })
        return
      }

      // 路由匹配不到处理
      res.writeHead(404, { 'content-type': 'text/plain' })
      res.write('404 NOT Found\n')
    })
}

module.exports = serveHandel
