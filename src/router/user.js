const userServeHandel = (req, res) => {
  if (req.method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: '登录成功',
    }
  }
}
module.exports = userServeHandel
