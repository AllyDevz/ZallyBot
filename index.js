const Discord = require("discord.js");

const config = require("./Config.json")

const mongo = require("mongoose");
const os = require('os');
const Enmap = require("enmap");
const client = new Discord.Client({ intents: 32767 });
const settings = require(`./botconfig/settings.json`);
module.exports = client;
client.settings = new Enmap({ name: "settings",dataDir: "./databases/settings"});
client.infos = new Enmap({ name: "infos", dataDir: "./databases/infos"});

client.userdb = require("./Database/user.js")
info = require("./Database/information.js")
client.slashCommands = new Discord.Collection();
client.on("ready", () => {
    require("./dashboard2/index.js")(client);
    console.log("Loading")
  })
require("./Handler")(client);

mongo.connect("URL DA DATABASE DA MONGODB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Unable to connect to MongoDB Database.\nError: ' + err)
})

client.login("O TOKEN");


client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
	.on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
	.on("error", (e) => client.logger.log(e, "error"))
	.on("warn", (info) => client.logger.log(info, "warn"));


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
             welcome.setDescription(`<@${member.user.id}> Entrou no servidor!\nAgora temos **${humans}** membros!`)}


            if(guildMongoDb.title){
             welcome.setTitle(guildMongoDb.title)
            } else {
             welcome.setTitle(`Bem-vindo ao ${member.guild.name}`)}


            if(guildMongoDb.footer){
             welcome.setFooter({ text: guildMongoDb.footer })}

            if(guildMongoDb.color){
             welcome.setColor(guildMongoDb.color)
            } else {
             welcome.setColor(`RANDOM`)}


    client.channels.cache.get(guildMongoDb.canal).send({ embeds: [welcome]})
})
