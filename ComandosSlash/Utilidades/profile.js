const { Discord, MessageEmbed } = require('discord.js')
const Canvas = require('canvas')
const { MessageAttachment, Util } = require("discord.js");
const { loadImage, registerFont, createCanvas } = require("canvas");
registerFont('././Font.otf', { family: 'Uniform' })

module.exports = {
    name: "user",
    description: "ver a sua atm ou a de alguém, Texto Modo",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "user",
         description: "usuário que você quer ver a atm.",
         type: 6,
         required: false
        },
        ],
    run: async (client, interaction) => {
        
    const user = interaction.options.getUser("user") || interaction.user

    const userdb = await client.userdb.findOne({
         userID: user.id
     }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png"}}
     function filtro(f){
    if(f === "./vFqyhnK.png"){
         return "https://cdn.discordapp.com/attachments/975219630756986903/975260732990046248/vFqyhnK.png"
        } else {
            return f
        }
     }
     const embed = new MessageEmbed()
      .setColor("a5d7ff")
      .setTitle("Profile Modo Texto")
      .setImage(`${filtro(userdb.economia.background)}`)
      .setDescription(`**Username:${user.username}**\n**Sobre:${userdb.economia.sobremim.slice(0,64)}\n${userdb.economia.sobremim.slice(64,128)}\n${userdb.economia.sobremim.slice(128,192)}** \n Total:$${abreviar(userdb.economia.banco + userdb.economia.money)}`)
       interaction.reply({embeds: [embed]});

      
}
}
function abreviar(number, precision=2) {
    return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
  }
  