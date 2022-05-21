const client = require("../../index");
const Discord = require("discord.js")

client.on("messageCreate", message => {
  const user = message.user.id
  console.log(user)
  async function color(){
    const userdb = await client.userdb.findOne({
      userID: user.id
  }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
  
  return userdb.economia.color
  }
  if(message.author.bot) return;
  if(!message.guild) return;
  
  if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`){
  
  const embed = new  Discord.MessageEmbed()
    .setTitle(`${client.user.username}`)
    .setColor(color())
    .setThumbnail(client.user.avatarURL())
    .setDescription(`> **Opa! Bão?** Me chamo \`${client.user.username}\`, se precisar de ajuda use /help para me adicionar em seu servidor\n __clique aqui para me adicionar__[Invite](https://discord.com/api/oauth2/authorize?client_id=962356709601460234&permissions=1103202674864&scope=applications.commands%20bot)`)

   message.reply({embeds: [embed]})
  }


 
  if(message.author.bot) return;
  if(!message.guild) return;
  
  if(message.content == `tem pra mobile?`){
  
  const embed = new  Discord.MessageEmbed()
    .setTitle(`${client.user.username}`)
    .setColor(color())
    .setThumbnail(client.user.avatarURL())
    .setDescription(`Claro Que Tem Meu Jovem`)

   message.reply({embeds: [embed]})
  }

  if(message.content == `Kitsune`){
  
    const embed = new  Discord.MessageEmbed()
      .setTitle(`${client.user.username}`)
      .setColor(color())
      .setImage("https://media.discordapp.net/attachments/975196720667455538/977684063420842004/Shikimori.png?width=355&height=454")
      .setDescription(`__Shikimori:__ **Curiosidade o meu criador originalmente criou a shadow e era a mesma personagem, ele tem a marca de uma mascara de kitsune, o jogo originalmente e touhou**`)
  
     message.reply({embeds: [embed]})
    }





 
  if(message.author.bot) return;
  if(!message.guild) return;
  
  if(message.content == `Shiki`){
  
  const embed = new  Discord.MessageEmbed()
    .setTitle(`${client.user.username}`)
    .setColor(color())
    .setThumbnail(client.user.avatarURL())
    .setDescription(`Oi?? Precisa de Ajuda Use /menu`)

   message.reply({embeds: [embed]})
  }
});