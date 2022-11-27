const Discord = require('discord.js')
const Canvas = require('canvas')
const { MessageAttachment, Util } = require("discord.js");
const { loadImage, registerFont, createCanvas } = require("canvas");
registerFont('././Font.otf', { family: 'Uniform' })

module.exports = {
    name: "perfil",
    description: "ver a sua atm ou a de alguém",
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
      try {

    
    const user = interaction.options.getUser("user") || interaction.user
    
    const userdb = await client.userdb.findOne({
         userID: user.id
     }) || { economia: { marry: { casado: false }, banco: 0, money: 0,rep: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png"}}

    const canvas = createCanvas(850, 550)
    const ctx = canvas.getContext("2d")

    const background = await Canvas.loadImage(userdb.economia.background)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    const layout = await Canvas.loadImage("./layout2.png")
    ctx.drawImage(layout, 0, 0, canvas.width, canvas.height)

ctx.font = '30px Uniform';
ctx.fillStyle = '#F8F8F8';
function fil(){
  if(user.id === "919678294947950643"){
    return `Owner:`
  } else {
    return " "
  }
}
console.log(fil())
ctx.fillText(`${fil()}`, 10, 37, 80)
ctx.fillText(`${user.username}`, 149 - user.username.length * 120, 300)

ctx.font = '22px Uniform';
ctx.fillStyle = '#F8F8F8';      
ctx.fillText(`${userdb.economia.sobremim.slice(0,64)}\n${userdb.economia.sobremim.slice(64,128)}`, 400, 495)
      
ctx.font = '23px Uniform';
ctx.fillStyle = '#F8F8F8';
ctx.fillText(`: ${abreviar(userdb.economia.rep)}`, 652, 201)
ctx.fillText(`${abreviar(userdb.economia.money)}`, 575, 130)
ctx.fillText(`${abreviar(userdb.economia.banco)}`, 690, 268)
ctx.fillText(`${abreviar(userdb.economia.banco + userdb.economia.money)}`, 672, 312)

ctx.save()
      
if(userdb.economia.marry.casado){
    const img = await Canvas.loadImage("./JI5SfCN.png")
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    const marryUser = await client.users.fetch(userdb.economia.marry.com)

ctx.font = '20px Uniform';
  ctx.fillStyle = '#F8F8F8';
ctx.fillText(`${marryUser.username}`, 690 - marryUser.username.length * 7.4, 74)
  
    const avatarUser = marryUser.avatarURL({ dynamic: true, format: "png", size: 1024 });

ctx.beginPath();
      ctx.arc(688, 111, 33, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
  
    const marryAvatar = await Canvas.loadImage(`${avatarUser}`)
   ctx.drawImage(marryAvatar, 656, 79, 65, 65)

}

ctx.restore()
      
ctx.beginPath();

      ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

const avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

    const userAvatar = await Canvas.loadImage(`${avatar}`)
    ctx.drawImage(userAvatar, 25, 25, 200, 200)
      
    const attach = new MessageAttachment(
        canvas.toBuffer(),
        `Profile_${user.tag}_.png`
      );
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'image.png')

   

  await interaction.reply({ files: [attachment]})  
  
  } catch(err) {
    // handle errors
    console.log(err)
    let userdb = await client.userdb.findOne({
      userID: interaction.user.id
  })
   
  if(!userdb){
      const newuser = new client.userdb({ userID: interaction.user.id })
      await newuser.save();
      
      userdb = await client.userdb.findOne({ userID: interaction.user.id })
  }    
    userdb.economia.background = "https://media.discordapp.net/attachments/975219630756986903/975260732990046248/vFqyhnK.png?width=683&height=442"; userdb.save()
    interaction.reply("Imagem Não Suportada, voltando para o default")
  }

}
}

function abreviar(number, precision=2) {
  return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
}
