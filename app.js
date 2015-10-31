/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var cfenv = require("cfenv")

var appEnv = cfenv.getAppEnv();
server.listen(appEnv.port, function () {
  console.log("server starting on " + appEnv.url);
});

// Routing
app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
  io.emit('newconnection', {
    ts: new Date().toISOString()
  });
  // when the client emits 'add user', this listens and executes
  socket.on('wecare', function (data) {
    console.log("wecare:", data)
    io.emit('wecare', {
      data: data
    });
  });
});
