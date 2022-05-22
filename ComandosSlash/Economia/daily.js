const Discord = require("discord.js");

module.exports = {
    name: "daily",
    description: "pegar o daily",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
    const user = interaction
    const userdb = await client.userdb.findOne({
            userID: user.id
        }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
        
      
     if(!userdb){
         const newuser = new client.userdb({ userID: interaction.user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: interaction.user.id })
     }
      
    if(Date.now() < userdb.cooldowns.daily){
      const calc = userdb.cooldowns.daily - Date.now()
      
         return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Vish`)
    .setColor(userdb.economia.color)
    .setDescription(`Ainda falta ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s para você pegar o Pagamento novamente.`)
], ephemeral: true})
     }  
      
      const dinheiro = Math.floor(Math.random() * 5000) + 5000

     await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "economia.money": userdb.economia.money + dinheiro,
         "cooldowns.daily": Date.now() + 86400000
     }
     })
     
    interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`💸 seu pagamento diario foi recebido`)
    .setColor(userdb.economia.color)
    .setDescription(`verifique seu banco ${abreviar(dinheiro)}$`)
]})
    }
};

function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}
function abreviar(number, precision=2) {
    return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
  }