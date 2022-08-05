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
  return [
    {
      id: '1',
      title: '标题1',
      content: '内容a',
      cratetime: '1659428575165',
      author: 'zhangsan',
    },
  ]
}
const newBlog = (blogdata) => {
  console.log('newb111olg', blogdata)
  return [
    {
      id: '3',
    },
  ]
}
const updateBlog = (id, blogdata) => {
  return true
}
const delBlog = (id) => {
  console.log(id)
  return true
}
module.exports = {
  getList,
  getDeatil,
  newBlog,
  updateBlog,
  delBlog,
}
