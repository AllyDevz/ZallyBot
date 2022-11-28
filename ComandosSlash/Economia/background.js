const Discord = require("discord.js");

module.exports = {
    name: "background",
    description: "alterar o Foto De Fundo do seu perfil",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "background",
         description: "digite o link da sua foto de fundo, Para alterna Para O padrao digite default",
         type: 11,
         required: true
        },
        ],
    run: async (client, interaction) => {
        
     const sobremim = interaction.options.getAttachment('attach')
     
     let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: interaction.user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: interaction.user.id })
     }

userdb.economia.background = sobremim.url; userdb.save()
     const butao = new Discord.MessageActionRow() 
     interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Wallapaper Trocado`)
     .setColor("a5d7ff")
     .setImage(e(sobremim))
     
     
          ]})

    }
};
