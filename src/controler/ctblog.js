const getList = (author, password) => {
  return [
    {
      id: '1',
      title: '标题1',
      content: '内容a',
      cratetime: '1659428575165',
      author: 'zhangsan',
    },
    {
      id: '2',
      title: '标题2',
      content: '内容a2',
      cratetime: '1659428975165',
      author: 'lisi',
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
module.exports = {
  getList,
  newBlog,
}
