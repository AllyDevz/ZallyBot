const Discord = require("discord.js")
module.exports = {
  name: "colorpremium",
  description: "cor personalizada premium",
  type: "CHAT_INPUT",
  options: [
        {
         name: "cor",
         description: "digite a cor desejada em hex",
         type: 3,
         required: true
        },
        ],  
  run: async(client, interaction) =>{
       const usuario = interaction.user;
       const userdb = await client.userdb.findOne({
        userID: usuario.id
        }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
        
      
     if(!userdb){
         const newuser = new client.userdb({ userID: interaction.user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: interaction.user.id })
     }



  const embed = new Discord.MessageEmbed()
    .setTitle('<:Shiki:979703866763407381> Sua cor foi salva com sucesso')
    .setColor("a5d7ff")
  if (userdb.economia.premium === "ispremium"){
  const sobremim = interaction.options.getString("cor")
  userdb.economia.sobremim = cor; userdb.save()
  interaction.reply({ embeds: [embed] })
  } else
  {
    interaction.reply("Voce precisa comprar o premium para utilizar este comando")
  }
  }
}