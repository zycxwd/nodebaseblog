const { exec } = require('../db/mysql')

const userLogin = (author, password) => {
  let sql = `select username,realname  from users where username='${author}' and password='${password}';`

  return exec(sql).then((rows) => {
    // select 反回都是数组
    return rows[0] || {} //查不到就返回{}
  })
}
module.exports = {
  userLogin,
}
