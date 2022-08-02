function query_string(url) {
  const query = {}
  for (const [name, value] of new URLSearchParams(url.split('?')[1])) {
    query[name] = value
  }
  return query
}

module.exports = query_string
