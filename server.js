/**************************************************************************
IMPORTS
**************************************************************************/


var express = require('express')
var history = require('connect-history-api-fallback')
var path = require('path')
var serveStatic = require('serve-static')


/**************************************************************************
EXPRESS SERVER
**************************************************************************/


var app = express()

app.use(history({verbose: true}))
app.use(serveStatic(path.join(__dirname, '/dist')))

var port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('Server started at http://localhost:5000')
})