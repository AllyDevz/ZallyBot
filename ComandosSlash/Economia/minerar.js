const Discord = require("discord.js");
const db = require("quick.db")
module.exports = {
    name: "minerar",
    description: "minere shikicoins",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
      let timeout = 40000;

      let user = interaction.user;
      let guild = interaction.guild;

      function ms(ms) {
          const seconds = ~~(ms/1000)
          const minutes = ~~(seconds/60)
          const hours = ~~(minutes/60) 
          const days = ~~(hours/24)
          
          return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
      
      }

      let author = await db.fetch(`work_${guild.id}_${user.id}`)  

      if (author !== null && timeout - (Date.now() - author) > 0) {
            
          let time = ms(timeout - (Date.now() - author));

          let error = new Discord.MessageEmbed()
          .setTitle(`descanse`)
          .setColor("RED")
          .setDescription(`**Voce ja minerou demais! Aguarde \`${time.minutes} minutos e ${time.seconds} segundos\`**`)
        
           interaction.reply({embeds: [error]})

      } else {     
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
      
    if(Date.now() < 1000 * 60 * 00){
      const calc = 1000 * 60 * 00 - Date.now()
      
         return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`🤔 Calma ae amigo...`)
    .setColor("a5d7ff")
    .setDescription(`Ainda falta ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s para você trabalhar novamente.`)
], ephemeral: true})
     } else {  
      
    let frase,
        emprego;
          
    switch (userdb.economia.trabalho .trampo){
      
  case "lixeiro":
    emprego = "🗑️ lixeiro"
    frase = ["juntou 20 sacos lixos", "dirigiu o caminhão de lixo por 2 horas"]
  break;
  
  case "pizza":
    emprego = "🍕 entregador de pizza"
    frase = ["entregou 8 pizzas", "trabalhou por 3 horas"]
  break;
  
  case "frentista":
    emprego = "⛽ frentista"
    frase = ["abasteceu 28 carros", "trocou o óleo de 8 caminhões"]
  break;
  
  case "caminhoneiro":
    emprego = "🚛 caminhoneiro"
    frase = ["uma carga de Rondônia levou até Porto velho", "fez 2 entregas em 1 dia"]
  break;
  
  case "sedex":
    emprego = "📦 entregador do sedex"
    frase = ["entegou 20 pacotes"]
  break;
  
  case "pescador":
    emprego = "🎣 pescador"
    frase = ["pescou 20 bagres", "pescou um peixe lendário no laguinho do seu Zé"]
  break;
  
  case "ti":
    emprego = "💻 técnico de ti"
    frase = ["arrumou 7 computadores de pessoas que clicaram em mães solteias", "desenvolveu um software para poder abrir links porno na sua empresa."]
  break;
  }
      
      const mxmn = 2000
      
      const dinheiro = Math.floor(Math.random() * mxmn) + mxmn

     await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "economia.money": userdb.economia.money + dinheiro,
         "cooldowns.work": Date.now() + userdb.economia.trabalho.cooldown
     }
     })
     
    frase = frase[Math.floor(Math.random() * frase.length)]
     
    interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`💸 Trabalho feito! `)
    .setColor("a5d7ff")
    .setDescription(`*Parabens** Você Minerou Shikimoney e ganhou ${dinheiro}`)
    
]})}
      }
    }
};

function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}
