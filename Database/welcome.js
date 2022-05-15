const mongo = require('mongoose')

const guildSet = new mongo.Schema({
    serverId: { type: String},
    canal: { type: String},
    image: { type: String},
    description: { type: String},
    footer: { type: String},
    title: { type: String},
    color: { type: String}
})

module.exports = 
mongo.model("SetChannelBv", guildSet)