const Discord = require("discord.js");

module.exports = {
    name: "casar",
    description: "casar com alguem.",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "user",
         description: "usuário que você quer casar.",
         type: 6,
         required: true
        },
        ],
    run: async (client, interaction) => {
        
     const user = interaction.options.getUser("user")
     async function botparse(user) {
        if(user === true){
            interaction.reply("Bot não Aceita Casamentos uma pena.. Tente achar alguem")
        } else {   
    const userdb = await client.userdb.findOne({
        userID: user.id
    }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}

          
     if(!userdb){
         const newuser = new client.userdb({ userID: interaction.user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: interaction.user.id })
     }
     
    let userdb2 = await client.userdb.findOne({
         userID: user.id
     })
      
     if(!userdb2){
         const newuser = new client.userdb({ userID: user.id })
         await newuser.save();
         
         userdb2 = await client.userdb.findOne({ userID: user.id })
     }
     

 

     if(interaction.user.id == user.id) return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`✋ Dá não filhão...`)
    .setColor(userdb.economia.color)
    .setDescription(`**Calma!** Você pode se casar consigo mesmo.`)
], ephemeral: true})

    if(userdb.economia.marry.casado) return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`✋ Dá não filhão...`)
    .setColor(userdb.economia.color)
    .setDescription(`**Calma!** Você já está casado com alguém.`)
], ephemeral: true})

    if(userdb2.economia.marry.casado) return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`✋ Dá não filhão...`)
    .setColor(userdb.economia.color)
    .setDescription(`**Calma!** ${user} já está casado com alguém.`)
], ephemeral: true})

    const butao = new Discord.MessageActionRow()
	.addComponents(
		new Discord.MessageButton()
		.setCustomId(`aceitar`)
		.setLabel('Aceitar')
		.setStyle('SECONDARY'),
		new Discord.MessageButton()
		.setCustomId(`recusar`)
		.setLabel('Recusar')
		.setStyle('SECONDARY'),
			);

   interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`💒 Casamentos 💍`)
    .setColor(userdb.economia.color)
    .setDescription(`Ei ${user}. ${interaction.user} quer se casar com você, aceitas?`)
], components: [butao], fetchReply: true}).then(msg =>{
    
    const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });

collector.on('collect', async i => {
    const userdb = await client.userdb.findOne({
        userID: user.id
    }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
    
      
  if(i.user.id !=user.id) return i.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👨 Calma ae...`)
    .setColor(userdb.economia.color)
    .setDescription(`Só quem recebeu o pedido de casamento pode usar o botão.`)
], ephemeral: true})

   collector.stop()

   if(i.customId == "aceitar"){
    const userdb = await client.userdb.findOne({
        userID: user.id
    }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
    
      
       
       await client.userdb.updateOne({
           userID: interaction.user.id
       }, { $set:{
          "economia.marry.casado": true,
          "economia.marry.com": user.id
       }
       })
       
       await client.userdb.updateOne({
           userID: user.id
       }, { $set:{
          "economia.marry.casado": true,
          "economia.marry.com": interaction.user.id
       }
       })
       
       
       interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Ihul Parabens Pelo Casamento`)
    .setColor(userdb.economia.color)
    .setDescription(`${user} aceitou o pedido de casamento de ${interaction.user}! 🎉🎉🎉🎉🎉`)
], components: []})
   }
   
   if(i.customId == "recusar"){
    const userdb = await client.userdb.findOne({
        userID: user.id
    }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
    
      
      interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Puts Cara...`)
    .setColor(userdb.economia.color)
    .setDescription(`${user} recusou o pedido de casamento de ${interaction.user}.`)
], components: []})
       
   }
   
})

})
}  
}
botparse(user.bot)
    }
};
