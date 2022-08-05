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
    let keyword = req.query.password || ''
    // const data = getList(author, keyword)
    // return new SuccessModel(data)
    const result = getList(author, keyword)
    return result.then((data) => {
      return new SuccessModel(data)
    })
  }

  //查看详情
  if (req.method === 'GET' && req.path === '/api/blog/detail') {
    const data = getDeatil(id)
    return new SuccessModel(data)
  }

  //新建
  if (req.method === 'POST' && req.path === '/api/blog/new') {
    const data = newBlog(req.body)
    return new SuccessModel(data)
  }

  //更新
  if (req.method === 'POST' && req.path === '/api/blog/update') {
    const blogdata = req.body
    const data = updateBlog(id, blogdata)
    if (data) {
      return new SuccessModel(data, '更新成功')
    } else {
      return new ErrorModel('更新失败')
    }
  }

  // 删除
  if (req.method === 'POST' && req.path === '/api/blog/del') {
    const data = delBlog(id)
    if (data) {
      return new SuccessModel(data, '删除成功')
    } else {
      return new ErrorModel('删除失败')
    }
  }
}

module.exports = blogServeHandel
