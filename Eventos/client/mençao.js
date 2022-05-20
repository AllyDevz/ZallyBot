const client = require("../../index");
const Discord = require("discord.js")

client.on("messageCreate", message => {
 
  if(message.author.bot) return;
  if(!message.guild) return;
  
  if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`){
  
  const embed = new  Discord.MessageEmbed()
    .setTitle(`${client.user.username}`)
    .setColor(`a5d7ff`)
    .setThumbnail(client.user.avatarURL())
    .setDescription(`> **Opa! Bão?** Me chamo \`${client.user.username}\`, se precisar de ajuda use /help`)

   message.reply({embeds: [embed]})
  }
});

client.on("messageCreate", message => {
 
  if(message.author.bot) return;
  if(!message.guild) return;
  
  if(message.content == `tem pra mobile?`){
  
  const embed = new  Discord.MessageEmbed()
    .setTitle(`${client.user.username}`)
    .setColor(`a5d7ff`)
    .setThumbnail(client.user.avatarURL())
    .setDescription(`Claro Que Tem Meu Jovem`)

   message.reply({embeds: [embed]})
  }
});


client.on("messageCreate", message => {
 
  if(message.author.bot) return;
  if(!message.guild) return;
  
  if(message.content == `Shiki`){
  
  const embed = new  Discord.MessageEmbed()
    .setTitle(`${client.user.username}`)
    .setColor(`a5d7ff`)
    .setThumbnail(client.user.avatarURL())
    .setDescription(`Oi?? Precisa de Ajuda Use /menu`)

   message.reply({embeds: [embed]})
  }
});