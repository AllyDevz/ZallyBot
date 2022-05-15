var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
const { Schema, model } = require("mongoose");
const mongo = require("mongoose");

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
app.get('/usersList', async (req, res) => {
    const User = mongo.model('infos', Schema({
        memory: str,
        memoryporcent: str
      }));
    const users = await User.find({});
    
    const userMap = {};
    users.forEach((user) => {
        userMap[user._id] = user;
    });
    
    res.send(userMap.memoryporcent[4]);
    
    });
var server = app.listen(3000, function() {}); 