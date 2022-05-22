const Discord = require("discord.js");

module.exports = {
    name: "depositar",
    description: "depositar seu dinheiro no banco",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "quantia",
         description: "digite uma quantia para depositar, ou digite [tudo]",
         type: 3,
         required: true
        },
        ],
    run: async (client, interaction) => {
        
     let quantia = interaction.options.getString("quantia")
     const user = interaction
     const userdb = await client.userdb.findOne({
         userID: user.id
     }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
     
if(quantia < 1 || isNaN(quantia) && quantia.toLowerCase() != "tudo"){
    return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👨 Calma ae...`)
    .setColor(userdb.economia.color)
    .setDescription(`Você deve especificar uma quantia válida acima de 0 para depositar, ou digitar \`tudo\` para depositar tudo que você tem na carteira.`)
], ephemeral: true})
}


 
 if(!userdb || userdb.economia.money == 0){
     return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`😢 Então amigo...`)
    .setColor(userdb.economia.color)
    .setDescription("Você atualmente não tem dinheiro nenhum em conta. Use `/daily` para pegar seu prêmio diário, ou pegue um emprego em `/empregos` e use `/work` para trabalhar.")
], ephemeral: true})
 }
 
  const usermoney = userdb.economia.money
 
  let dinero;
 
 if(quantia.toLowerCase() == "tudo"){
     
     dinero = usermoney
     
 } else {
 
 quantia = ~~quantia

 if(usermoney < quantia)
   return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`😢 Então amigo...`)
    .setColor(userdb.economia.color)
    .setDescription(`Você não tem toda essa quantia para depositar no momento, atualmente você só tem ${usermoney} dinheiros.`)
], ephemeral: true})

  dinero = quantia

}

  await client.userdb.updateOne({
      userID: interaction.user.id
  },{ $set: {
          "economia.money": usermoney - dinero,
          "economia.banco": userdb.economia.banco + dinero
      }
    })

  interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`💸 Ta ná mão my friendo!`)
    .setColor(userdb.economia.color)
    .setDescription(`Você acaba de transferir 🤑 \`${abreviar(dinero)}\` dinheiros para sua conta do banco!`)
]})

    }
};
function abreviar(number, precision=2) {
    return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
  }