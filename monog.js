var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
const { Schema, model } = require("mongoose");
const mongo = require("mongoose");
info = require("./Database/user.js")
var url = 'mongodb+srv://AllyDevz:all150913a@cluster0.i8sgi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
var str = "";
mongo.connect("mongodb+srv://AllyDevz:all150913a@cluster0.i8sgi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Unable to connect to MongoDB Database.\nError: ' + err)
})
app.get('/potato/:id', function (req, res) {
    console.log(req.params['id']);
    res.send(req.params['id']);
  });
app.get('/user/:id', async (req, res) => {
    const novoserver = new info({
    userID: req.params['id']
    })
    const q = req.params['id']
    res.send(`${novoserver}`);
    console.log(`${novoserver}`)
    
    });
var server = app.listen(3000, function() {}); 