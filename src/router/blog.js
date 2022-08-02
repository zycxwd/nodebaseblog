const { getList, newBlog } = require('../controler/ctblog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const blogServeHandel = (req, res) => {
  // 我们这里不res.end操作app.js统一处理返回,因为每个路由都需要end
  //接口路由文件 只 return { mag: 'xxx',} object格式数据

  //查看;列表
  if (req.method === 'GET' && req.path === '/api/blog/list') {
    let author = req.query.author || ''
    let keyword = req.query.password || ''
    const data = getList(author, keyword)
    return new SuccessModel(data)
  }

  //查看详情
  if (req.method === 'GET' && req.path === '/api/blog/detail') {
    return {
      mag: '列表博客详情成功',
    }
  }

  //新建
  if (req.method === 'POST' && req.path === '/api/blog/new') {
    const data = newBlog(req.body)
    return new SuccessModel(data)
  }

  //更新
  if (req.method === 'POST' && req.path === '/api/blog/update') {
    return {
      mag: '列表博客更新成功',
    }
  }

  // 删除
  if (req.method === 'POST' && req.path === '/api/blog/del') {
    return {
      mag: '列表博客删除成功',
    }
  }
}

module.exports = blogServeHandel
