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
app.get('/user/:id', async function (req, res) {
          let novoserver = await info.findOne({
                  userID: req.params['id']
              }) || { economia: { banco: 0, money: 0}, color:"36393e",sobremim: { type: String, default: "Para Altera o Texto va no seu servidor onde esta o bot e dige /sobremim" },rep: { type: Number, default: 0 },usuario: { type: String, default: "Usuario Não Registrado" }}
    
    res.json(novoserver.economia.banco);
  });
app.get('/api/user/:id', async (req, res) => {
      let novoserver = await info.findOne({
                  userID: req.params['id']
              }) || { economia: { banco: 0, money: 0}, color:"36393e",sobremim: { type: String, default: "Para Altera o Texto va no seu servidor onde esta o bot e dige /sobremim" },rep: { type: Number, default: 0 },usuario: { type: String, default: "Usuario Não Registrado" }}
    const q = req.params['id']
    res.json(novoserver);
    const data = novoserver.userID
    console.log(data)
    
    });
var server = app.listen(3000, function() {}); 