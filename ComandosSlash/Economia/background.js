const Discord = require("discord.js");

module.exports = {
    name: "background",
    description: "alterar o Foto De Fundo do seu perfil",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "background",
         description: "digite o link da sua foto de fundo, Para alterna Para O padrao digite default",
         type: 3,
         required: true
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
    if(s === "default"){
        return "./vFqyhnK.png"
    } else {
        return s
    }
}
function e(s){
    if(s === "default"){
        return "https://media.discordapp.net/attachments/975219630756986903/975260732990046248/vFqyhnK.png?width=683&height=442"
    } else {
        return s
    }
}
userdb.economia.background = filtro(sobremim); userdb.save()
     const butao = new Discord.MessageActionRow() 
     interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Wallapaper Trocado`)
     .setColor("a5d7ff")
     .setImage(e(sobremim))
     
     
          ]})

    }
};
