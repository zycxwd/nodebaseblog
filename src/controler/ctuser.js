const userLogin = (author, keyword) => {
  if (author === 'zhangyachi' && keyword === '123') {
    return true
  }
  return false
}
module.exports = {
  userLogin,
}
