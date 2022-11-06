const Discord = require("discord.js")
module.exports = {
  name: "chatbot",
  description: "criar chatbot",
  type: "CHAT_INPUT",
  run: async(client, interaction) =>{
   
  const embed = new Discord.MessageEmbed()
    .setTitle('🛑Ver todas as opçoes')
    .setColor("a5d7ff")
    .setDescription('Selecione uma Cor Para ')
  message.guild.channels.create('chatbot', {
      type: 'GUILD_TEXT',
        permissionOverwrites: [{
          id: message.guild.id,
            allow: ['VIEW_CHANNEL'],
            deny: ['SEND_MESSAGES'],
      }]
    });
    
  }
}