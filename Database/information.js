const mongo = require('mongoose')

const info = new mongo.Schema({
    memory: { type: String},
    memoryporcent: { type: String},
    membrocounter: { type: String },
    mtc: { type: String },
})

module.exports = 
mongo.model("Info", info)