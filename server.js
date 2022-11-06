const { response } = require('express');

var http, director, cool, bot, router, server, port;

http        = require('http');
director    = require('director');
cool        = require('cool-ascii-faces');
bot         = require('./index.js');
const os = require('os');
info = require("./Database/information.js")
let usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();
let  getpercentage = 
((usedMemory/totalMemory) * 100).toFixed(2) + '%'
router = new director.http.Router({
  '/' : {
    post: bot.respond,
    get: ping
  },
  '/statuspage' : {

    get: statuspage
  }
});

server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end("error:" + err.message);
  });

});

port = Number(process.env.PORT || 5000);
server.listen(port);

function ping() {
  this.res.writeHead(200);
  this.res.end("Hey, I'm Cool Guy.");
  console.log("pinged")
}

function statuspage() {


    let usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();
    let  getpercentage = 
    ((usedMemory/totalMemory) * 100).toFixed(2) + '%'
    test = `
            online
`
  this.res.end(test);
  

  this.res.writeHead(200);
  //const big = "<h1 style=`text-align:center`>AllyDevz Status Page<h1>"

  //this.res.end(big);
  
}