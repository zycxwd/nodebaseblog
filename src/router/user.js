const { userLogin } = require('../controler/ctuser')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const userServeHandel = (req, res) => {
  if (req.method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    const resove = userLogin(username, password)
    if (resove) {
      return new SuccessModel('登录成功')
    } else {
      return new ErrorModel('登录失败')
    }
  }
}
module.exports = userServeHandel
