const Discord = require('discord.js')
const Canvas = require('canvas')
const { MessageAttachment, Util } = require("discord.js");
const { loadImage, registerFont, createCanvas } = require("canvas");
registerFont('././Font.otf', { family: 'Uniform' })

module.exports = {
  name: "ship",
  description: "ver a sua atm ou a de alguém",
  type: 'CHAT_INPUT',
  options: [
    {
      name: "user",
      description: "usuário que você quer ver a atm.",
      type: 'USER',
      required: true
    },
    {
      name: "user2",
      description: "usuário que você quer ver a atm.",
      type: 'USER',
      required: true
    },
  ],
  run: async (client, interaction) => {
    try {


      const user = interaction.options.getUser("user")
      const user2 = interaction.options.getUser("user2")

      const canvas = createCanvas(850, 550)
      const ctx = canvas.getContext("2d")
      const avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
      const avatar2 = user2.avatarURL({ dynamic: true, format: "png", size: 1024 });
      const userAvatar = await Canvas.loadImage(`${avatar}`)
      const userAvatar2 = await Canvas.loadImage(`${avatar2}`)
      const bar = await Canvas.loadImage(`./bar2.png`)
      const numero = Math.round(Math.random() * 99) + 1
      function t(gen){
      if(gen === "100"){
          return "700"
      } else {
        if(gen === "50"){
            return "500"
        } else {
            if(gen === "10"){
                return "100"
            }
        }
      }
      }
      const random = Math.floor(Math.random() * t(numero));
      const barra = numero + numero + 300
      ctx.drawImage(userAvatar, 62, 80, 265, 265)
      ctx.drawImage(userAvatar2, 527, 84, 265, 265)
      ctx.drawImage(bar, 120, 450, barra, 70)
      const layout = await Canvas.loadImage("./ship.png")
      ctx.drawImage(layout, 0, 0, canvas.width, canvas.height)
      function test() {
        if (random >= 100) {
          return baixa
          /*
            CODE HERE
          */
        } else { // 80% chance
          return alta
          /*
            CODE HERE
          */
        }
      }
      ctx.font = '20px Uniform';
      ctx.fillStyle = '#000c24';
      ctx.textAlign = "center"; 
      ctx.fillText(`Chance de: ${numero}%`, 435, 400)


      ctx.font = '20px Uniform';
      
      ctx.fillStyle = '#F8F8F8';
      ctx.textAlign = "right"; 

      ctx.fillText(`${user.username.slice(0, 8)}`, 240, 400)

      ctx.font = '20px Uniform';
      ctx.textAlign = "left"; 
      ctx.fillStyle = '#F8F8F8';
      ctx.fillText(`${user2.username.slice(0, 8)}`, 625, 400)


      const attach = new MessageAttachment(
        canvas.toBuffer(),
        `Ship_${user.tag}_.png`
      );
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'image.png')



      await interaction.reply("carregando aguarde")
      await interaction.followUp({ files: [attachment] });
    } catch (err) {
      // handle errors
      console.log(err)
      interaction.reply("**Desculpe aconteceu algum erro aqui.**")
    }

  }
}

function abreviar(number, precision = 2) {
  return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
}
