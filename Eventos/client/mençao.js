const client = require("../../index");
const Discord = require("discord.js")
client.on("messageCreate", async message => {
  const user = message
  if(message.author.bot) return;
  if(user.author.username === "Axiore Community #fruit-stock"){
    let channel = client.channels.cache.get("968325803765014538");
    channel.send("**Shikimori avistou frutas**\n<@&977760883855994960>")

  }

  
})
client.on("message", async message => {

  if (message.channel.name == "chatbot") {
  if (message.author.bot) return;
  message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
  
  if (message.content.includes(`@`)) {
  return message.channel.send(`**❌ Por Favor, Não Mencione Ninguem**`);
   }
  
 
  if (!message.content) return
  
  
  const fetch = require('node-fetch');
  
  const translated = message.content
  
  
  fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${message.content}&name=Shikimori&user=1`)
      .then(res => res.json())
      .then(async data => {
  
  console.log(data)
  if(data.message == 0) return message.inlineReply('erro no sistema.');
          message.channel.send(`${data.message}`);
      });

  }
  });

client.on("messageCreate", async message => {
  const user = message
  
  
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