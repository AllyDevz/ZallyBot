const Discord = require("discord.js")
module.exports = {
  name: "addprm",
  description: "「🎨 Cores Premium developer add 」",
  type: "CHAT_INPUT",
  options: [{
    name: 'usuario',
    type: 'USER',
    description: 'Select a user/id',
    required: false,
}], 
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
    }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"#5234eb"}}


  const embed = new Discord.MessageEmbed()
    .setTitle('[🎨 o usuario foi adicionado ao programa premium. ]')
    .setColor("a5d7ff")
  if (interaction.user.id === "919678294947950643"){
  const cor = "ispremium"
  userdb.economia.premium = cor; userdb.save()
  interaction.reply({ embeds: [embed] })
  } else
  {
    interaction.reply("[ \🧧 | Voce não e o desenvolvedor ]")
  }
  }
}