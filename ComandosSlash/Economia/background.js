const Discord = require("discord.js");

module.exports = {
    name: "background",
    description: "alterar o Foto De Fundo do seu perfil",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "background",
         description: "não e permitido .jpg",
         type: 11,
         required: true
        },
        ],
    run: async (client, interaction) => {
        
     let attachment = interaction.options.getString('background')
     if(attachment.contentType === 'image/png' || !attachment.contentType.includes('image')) return interaction.reply(':QdW_meltedo: | Meu profile só suporta imagens...')
     if(attachment.height !== 720 || attachment.width !== 1280) return interaction.reply(':QdW_meltedo: | O Background precisa ser no tamanho `1280x720`!')
     let img = new MessageAttachment(attachment.proxyURL)
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
userdb.economia.background = filtro(img); userdb.save()
     const butao = new Discord.MessageActionRow() 
     interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Wallapaper Trocado`)
     .setColor("a5d7ff")
     .setImage(e(img))
     
     
          ]})

    }
};
