const {
  getList,
  getDeatil,
  newBlog,
  updateBlog,
  delBlog,
} = require('../controler/ctblog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const checklogin = (req) => {
  if (!req.session.username) {
    // 未登录提示
    return Promise.resolve(new ErrorModel('请登录'))
  }
  // 登录就返回 undifind 即可
}

const blogServeHandel = (req, res) => {
  // 我们这里不res.end操作app.js统一处理返回,因为每个路由都需要end
  //接口路由文件 只 return { mag: 'xxx',} object格式数据
  const id = req.query.id
  //查看;列表
  if (req.method === 'GET' && req.path === '/api/blog/list') {
    let author = req.query.author || ''
    let keyword = req.query.keyword || ''
    // const data = getList(author, keyword)
    // return new SuccessModel(data)
    const result = getList(author, keyword)
    return result.then((data) => {
      return new SuccessModel(data)
    })
  }

  //查看详情
  if (req.method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDeatil(id)
    return result.then((data) => {
      return new SuccessModel(data)
    })
  }

  //新建
  if (req.method === 'POST' && req.path === '/api/blog/new') {
    const checkloginResult = checklogin(req)
    if (checkloginResult) {
      return checklogin
    }
    req.body.author = req.session.username //没有登录 没有author
    const result = newBlog(req.body)
    return result.then((data) => {
      return new SuccessModel(data)
    })
  }

  //更新
  if (req.method === 'POST' && req.path === '/api/blog/update') {
    const checkloginResult = checklogin(req)
    if (checkloginResult) {
      return checklogin
    }
    const blogdata = req.body
    const result = updateBlog(id, blogdata)
    return result.then((val) => {
      if (val) {
        return new SuccessModel(val, '更新成功')
      } else {
        return new ErrorModel('更新失败')
      }
    })
  }

  // 删除
  if (req.method === 'POST' && req.path === '/api/blog/del') {
    const checkloginResult = checklogin(req)
    if (checkloginResult) {
      return checklogin
    }
    // 获取登录后的username
    req.body.author = req.session.username
    console.log(req.body.author)
    const result = delBlog(id, req.body.author)
    return result.then((val) => {
      if (val) {
        return new SuccessModel(val)
      } else {
        return new ErrorModel('删除失败')
      }
    })
  }
}

module.exports = blogServeHandel
