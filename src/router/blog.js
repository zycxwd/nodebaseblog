const {
  getList,
  getDeatil,
  newBlog,
  updateBlog,
  delBlog,
} = require('../controler/ctblog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

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
    req.body.author = 'zhangsan' //没有登录 没有author
    const result = newBlog(req.body)
    return result.then((data) => {
      return new SuccessModel(data)
    })
  }

  //更新
  if (req.method === 'POST' && req.path === '/api/blog/update') {
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
    req.body.author = 'zhangsan' //没有登录 没有author
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
