const Discord = require("discord.js");

module.exports = {
    name: "minerar",
    description: "minere shikicoins",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
     
     let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
      
     if(!userdb || !userdb.economia.trabalho.trampo){
         return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`✋ Dá não filhão...`)
    .setColor("a5d7ff")
    .setDescription(`**Calma!** Você ainda não tem um emprego, digite /empregos para ver a lista de empregos e escolher algum.`)
], ephemeral: true})
     }
      
    if(Date.now() < 0000 * 60 * 00){
      const calc = 0000 * 60 * 00 - Date.now()
      
         return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`🤔 Calma ae amigo...`)
    .setColor("a5d7ff")
    .setDescription(`Ainda falta ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s para você trabalhar novamente.`)
], ephemeral: true})
     } else {  
      

      
      if(Date.now() < userdb.cooldowns.minerar){
        const calc = userdb.cooldowns.minerar - Date.now()
        
           return interaction.reply({embeds: [new Discord.MessageEmbed()
      .setTitle(`Vish`)
      .setColor(userdb.economia.color)
      .setDescription(`Ainda falta ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s para você minerar shikicoins novamente.`)
  ], ephemeral: true})
       }  
        
        const dinheiro = Math.floor(Math.random() * 5000) + 5000
  
       await client.userdb.updateOne({
           userID: interaction.user.id
       }, { $set: {
           "economia.money": userdb.economia.money + dinheiro,
           "cooldowns.minerar": Date.now() + 10000
       }
       })
     
    interaction.reply({embeds: [new Discord.MessageEmbed()

    .setColor(userdb.economia.color)
    .setDescription(`**Parabens** __Você Minerou Shikimoney e ganhou ${dinheiro} Shikicoins__`)
    
]})}
    }
};

function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}
