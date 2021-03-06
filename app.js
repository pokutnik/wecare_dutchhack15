/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// Setup basic express server
var express = require('express');
var fs = require('fs');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var cfenv = require('cfenv');


var appEnv = cfenv.getAppEnv();


server.listen(appEnv.port, function () {
  console.log("server starting on " + appEnv.url);
});

// Routing
app.use(express.static(__dirname + '/public/dist'));
app.use(express.static(__dirname + '/public'));


io.on('connection', function (socket) {
  io.emit('newconnection', {
    ts: new Date().toISOString()
  });

  // subscrive client to live data
  socket.on('sub.live', function () {
    socket.join('live');
  });

  socket.on('wecare', function (string) {
    //console.log('wecare:', string)
    var data = str_to_obj(string);
    if (data) {
      broadcast_live(data);
      store_csv(string);
    } else {
      console.log('WARNING wrong data:', string);
    }
  });
});

if (appEnv.isLocal) {
  console.log("WARNING: Sending sample events")
  lines = fs.readFileSync('public/sample.csv', {encoding: "ascii"}).split("\n")
    setInterval(function(){
      line = lines.pop()
      var data = str_to_obj(line);
      if(data){
        data.ts = new Date().getTime();
        broadcast_live(data);
      }
    }, 600);
}

function str_to_obj(s) {
  var v = s.trim().split(",");
  if (v.length != 7) { return undefined; }

  return {
    flow: v[0],
    emotion: v[1],
    hi: v[2],
    lo: v[3],
    hr: v[4],
    hrv: v[5],
    ts: v[6]
  }
}

function broadcast_live(data) {
  io.to('live').emit('wecare', data);
}

function store_csv(line) {
  fs.appendFile("public/all_data.csv", line+"\n", function (err) {
    if (err){
      console.log("ERROR: could_not write file:", err)
    }
  });
}

function fetch(data) {
  // TODO: add fetching
}


