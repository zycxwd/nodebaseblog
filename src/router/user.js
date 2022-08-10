const { userLogin } = require('../controler/ctuser')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')
const userServeHandel = (req, res) => {
  if (req.method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    // const username = req.query.username//改成get测试时 从query中拿
    // const password = req.query.password
    const resove = userLogin(username, password)
    return resove.then((data) => {
      if (data.username) {
        // 不直接用cookie暴露用户信息
        // res.setHeader('Set-Cookie', `username=${data.username};path=/;httpOnly`)
        req.session.username = data.username
        req.session.realname = data.realname
        // req.cookie.sessionId那个时间戳加随机数
        set(req.cookie.sessionId, req.session)
        console.log('reqsession:', req.session)
        return new SuccessModel('登录成功')
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }
}
module.exports = userServeHandel
