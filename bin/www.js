const http = require('http')
const serveHandel = require('../app')
const serve = http.createServer(serveHandel)
serve.listen(3000)
