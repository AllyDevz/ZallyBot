const Discord = require("discord.js");

module.exports = {
    name: "background",
    description: "alterar o Foto De Fundo do seu perfil",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "background",
         description: "digite o link da sua foto de fundo",
         type: 3,
         required: false
        },
        ],
    run: async (client, interaction) => {
        
     const sobremim = interaction.options.getString("background")
     
     let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: interaction.user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: interaction.user.id })
     }
function filtro(s){
    if(s === null){
        return "./vFqyhnK.png"
    } else {
        return s
    }
}
userdb.economia.background = filtro(sobremim); userdb.save()
     const butao = new Discord.MessageActionRow() 
     interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`😉 Ta na mão chefe!`)
     .setColor("a5d7ff")
     .setDescription(`> Seu Fundo foi alterado para: \`${filtro(sobremim)}\``)
     
          ]})

    }
};
