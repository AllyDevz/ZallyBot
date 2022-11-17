const Discord = require("discord.js")
module.exports = {
  name: "menu",
  description: "「🧶 | ver o menu de comandos 」",
  type: "CHAT_INPUT",
  run: async(client, interaction) =>{
   
  const embed = new Discord.MessageEmbed()
    .setTitle('🛑Ver todas as opçoes')
    .setColor("a5d7ff")
    .setDescription('Selecione uma Cor Para ')
  
const row = new Discord.MessageActionRow()
	.addComponents(
	new Discord.MessageSelectMenu()
    .setCustomId('menu')
	.setPlaceholder('selecione uma opçao')
	.addOptions([
		{
			label: 'Menu',
      emoji: '🧶',
			value: 'padrão',
		},
		{
	    	label: 'Sobremenu',
        emoji: '🎆',
		    value: 'menu',
		},


	]),
			);

interaction.reply({embeds: [embed], components: [row], fetchReply: true}).then(msg => {

  const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });

collector.on('collect', async i => {

  if(i.user.id != interaction.user.id) return i.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`✨ Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Só quem solicitou o menu pode usá-lo.`)
], ephemeral: true})

   i.deferUpdate()

   if(i.values[0] == "menu"){
    interaction.editReply({embeds: [new Discord.MessageEmbed()
     .setTitle('Sobre Menu')
     .setColor("03fc41")
     .setThumbnail(`https://i.imgur.com/JJcMsox.gif`)
               ]})

   }
  if(i.values[0] == "padrão"){
   interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle('Menu')
    .setColor("36393e")
    .setThumbnail(`https://i.imgur.com/JJcMsox.gif`)

              ]})
  }
})//collector
  
})//.thens
    
  }
}