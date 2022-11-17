const Discord = require("discord.js")
module.exports = {
  name: "addprm",
  description: "[🎨 Cores Premium developer add ]",
  type: "CHAT_INPUT",
  options: [
        {
         name: "usuario",
         description: "esse painel e apenas pro desenvolvedor",
         type: 3,
         required: true
        },
        ],  
  run: async(client, interaction) =>{
    const usuario = interaction.options.getUser('usuario')
    const userId = interaction.member.user.id;
  
    const user = client.users.cache.find(user => user.id === userId)

    function getUserFromMention(usuario) {
        if (!usuario){
          return user
        }

        if (usuario.toString().startsWith('<@') && usuario.toString().endsWith('>')) {
          usuario = usuario.toString().slice(2, -1);

          if (usuario.toString().startsWith('!')) {
            usuario = usuario.toString().slice(1);
          }

          return client.users.cache.get(usuario);
        }
      }


      const p = getUserFromMention(usuario)
      const userdb = await client.userdb.findOne({
        userID: p.id
    }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}


  const embed = new Discord.MessageEmbed()
    .setTitle('[🎨 o usuario foi adicionado ao programa premium. ]')
    .setColor("a5d7ff")
  if (userdb.economia.premium === "ispremium"){
  const cor = interaction.options.getString("cor")
  userdb.economia.color = cor; userdb.save()
  interaction.reply({ embeds: [embed] })
  } else
  {
    interaction.reply("[ \🧧 | Voce precisa compra o premium para usar este comando ]")
  }
  }
}