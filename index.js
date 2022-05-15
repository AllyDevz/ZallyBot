const Discord = require("discord.js");

const config = require("./Config.json")

const mongo = require("mongoose");
const os = require('os');

const client = new Discord.Client({ intents: 32767 });

module.exports = client;

client.userdb = require("./Database/user.js")
info = require("./Database/information.js")
client.slashCommands = new Discord.Collection();

require("./Handler")(client);

mongo.connect("mongodb+srv://AllyDevz:all150913a@cluster0.i8sgi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Unable to connect to MongoDB Database.\nError: ' + err)
})

client.login("OTYyMzU2NzA5NjAxNDYwMjM0.YlGWhw.S1R91U5VpRnyWU99Ca11-h5S0lM");





setInterval(() =>{

    let usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();
    let  getpercentage = 
    ((usedMemory/totalMemory) * 100).toFixed(2) + '%'
    const novoserver = new info({
      memory: usedMemory,
      memoryporcent: getpercentage
  })
    console.log(`Memória RAM utilizada em GB\`: \**${(usedMemory/ Math.pow(1024, 3)).toFixed(2)}`+`\nMemória RAM utilizada\`: \**${getpercentage}\**`)
  }, 15*1000);

const server = require("./Database/welcome.js")

client.on("guildMemberAdd", async (member) => {

const humans = member.guild.members.cache.filter((m) => !m.user.bot).size

    let guildMongoDb = await server.findOne({

        serverId: member.guild.id
    })
    if (!guildMongoDb || !guildMongoDb.canal) return;
            const welcome = new Discord.MessageEmbed()
            .setTimestamp()
            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            if(guildMongoDb.image){
             welcome.setImage(guildMongoDb.image)
            }

            if(guildMongoDb.description){
             welcome.setDescription(guildMongoDb.description)
            } else {
             welcome.setDescription(`<@${member.user.id}> Joined the server!\nNow we have **${humans}** members!`)}


            if(guildMongoDb.title){
             welcome.setTitle(guildMongoDb.title)
            } else {
             welcome.setTitle(`Welcome to ${member.guild.name}`)}


            if(guildMongoDb.footer){
             welcome.setFooter({ text: guildMongoDb.footer })}

            if(guildMongoDb.color){
             welcome.setColor(guildMongoDb.color)
            } else {
             welcome.setColor(`RANDOM`)}


    client.channels.cache.get(guildMongoDb.canal).send({ embeds: [welcome]})
})