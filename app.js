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

  // subscrive client to live data
  socket.on('sub.live', function () {
    socket.join('live')
  });

  socket.on('wecare', function (data) {
    console.log('wecare:', data)
    broadcast_live(data)
  });
});

function broadcast_live(data) {
  io.to('live').emit('wecare', data);
}

function store(data) {
  // TODO: add storage
}

function fetch(data) {
  // TODO: add fetching
}
