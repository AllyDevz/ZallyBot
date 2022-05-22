const client = require("../../index");
const Discord = require("discord.js")

client.on("messageCreate", async message => {
  const user = message
  console.log(user)
  
    const userdb = await client.userdb.findOne({
      userID: user.author.id
  }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
  
  
  if(message.author.bot) return;
  if(!message.guild) return;
  
  if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`){
  
  const embed = new  Discord.MessageEmbed()
    .setTitle(`${client.user.username}`)
    .setColor(userdb.economia.color)
    .setThumbnail(client.user.avatarURL())
    .setDescription(`> **Opa! Bão?** Me chamo \`${client.user.username}\`, se precisar de ajuda use /help para me adicionar em seu servidor clique aqui[Invite]("https://discord.com/api/oauth2/authorize?client_id=962356709601460234&permissions=1103202674864&scope=applications.commands%20bot")`)

   message.reply({embeds: [embed]})
  }
});

client.on("messageCreate", async message => {
  const user = message
  console.log(user)
  
    const userdb = await client.userdb.findOne({
      userID: user.author.id
  }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
  
  
  
  if(message.author.bot) return;
  if(!message.guild) return;
  
  if(message.content == `tem pra mobile?`){
  
  const embed = new  Discord.MessageEmbed()
    .setTitle(`${client.user.username}`)
    .setColor(userdb.economia.color)
    .setThumbnail(client.user.avatarURL())
    .setDescription(`Claro Que Tem Meu Jovem`)

   message.reply({embeds: [embed]})
  }
});


client.on("messageCreate", async message => {
  const user = message
  console.log(user)
  
  const userdb = await client.userdb.findOne({
      userID: user.author.id
  }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
  
  
  
  if(message.author.bot) return;
  if(!message.guild) return;
  
  if(message.content == `Shiki`){
  
  const embed = new  Discord.MessageEmbed()
    .setTitle(`${client.user.username}`)
    .setColor(userdb.economia.color)
    .setThumbnail(client.user.avatarURL())
    .setDescription(`Oi?? Precisa de Ajuda Use /menu`)

   message.reply({embeds: [embed]})
  }
});