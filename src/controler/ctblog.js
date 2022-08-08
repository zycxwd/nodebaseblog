const { exec } = require('../db/mysql')
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author =${author} `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc`
  return exec(sql)
}
const getDeatil = (id) => {
  let sql = `select * from blogs where id='${id}' `
  return exec(sql).then((rows) => {
    // mysql返回的是数组格式 这里只要具体的对象
    return rows[0]
  })
}
//      OkPacket {
//   fieldCount: 0,
//   affectedRows: 1,//影响函数
//   insertId: 5,
//   serverStatus: 2,
//   warningCount: 0,
//   message: '',
//   protocol41: true,
//   changedRows: 0//update时候回改变这个值
// }
const newBlog = (blogdata) => {
  const title = blogdata.title
  const content = blogdata.content
  const author = blogdata.author
  const createtime = Date.now()
  let sql = `insert into blogs (title ,content,createtime,author) values ('${title}','${content}',${createtime},'${author}')`
  return exec(sql).then((OkPacket) => {
    console.log('insertdat:', OkPacket)
    //拿到id字段 返回对象包含id
    return {
      id: OkPacket.insertId,
    }
  })
}
const updateBlog = (id, blogdata) => {
  let title = blogdata.title
  let content = blogdata.content

  const sql = `update blogs set title ='${title}' , content='${content}' where id=${id}`
  return exec(sql).then((updataData) => {
    console.log(updataData)
    if (updataData.affectedRows > 0) {
      return {
        id: id,
      }
    }
    return false
  })
}
const delBlog = (id, author) => {
  console.log(id)
  const sql = `delete from blogs where id=${id} and author='${author}' `
  return exec(sql).then((delData) => {
    console.log(delData)
    if (delData.affectedRows > 0) {
      return true
    }
    return false
  })
}
module.exports = {
  getList,
  getDeatil,
  newBlog,
  updateBlog,
  delBlog,
}
