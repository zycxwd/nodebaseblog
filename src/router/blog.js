const blogServeHandel = (req, res) => {
  console.log(req.path)
  console.log(req.method)
  console.log(req.query)
  // 我们这里不res.end操作app.js统一处理返回,因为每个路由都需要end
  //接口路由文件 只 return { mag: 'xxx',} object格式数据

  //查看;列表
  if (req.method === 'GET' && req.path === '/api/blog/list') {
    return {
      mag: '列表获取成功',
    }
  }

  //查看详情
  if (req.method === 'GET' && req.path === '/api/blog/detail') {
    return {
      mag: '列表博客详情成5功',
    }
  }

  //新建
  if (req.method === 'POST' && req.path === '/api/blog/new') {
    return {
      mag: '列表博客新建成功',
    }
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
