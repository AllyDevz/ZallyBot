const Discord = require("discord.js")
module.exports = {
  name: "help",
  description: "Ver a lista de comandos do bot",
  type: "CHAT_INPUT",
  run: async(client, interaction) =>{
   
  const embed = new Discord.MessageEmbed()
    .setTitle('🤖 Ver todos os comandos do bot!')
    .setColor("a5d7ff")
    .setDescription('Selecione uma categoria de comandos para ver.')
  
const row = new Discord.MessageActionRow()
	.addComponents(
	new Discord.MessageSelectMenu()
    .setCustomId('menu')
	.setPlaceholder('selecione uma categoria de comandos.')
	.addOptions([
		{
			label: 'Economia',
      emoji: '🤑',
			value: 'economia',
		},
		{
	    	label: 'Outros',
        emoji: '🌐',
		    value: 'outros',
		},
		{
      label: 'Shikimori',
      emoji: '🎁',
      value: 'Shikimori',
  },
	]),
			);

interaction.reply({embeds: [embed], components: [row], fetchReply: true}).then(msg => {

  const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });

collector.on('collect', async i => {

  if(i.user.id != interaction.user.id) return i.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👨 Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Só quem solicitou o menu pode usá-lo.`)
], ephemeral: true})

   i.deferUpdate()

 if(i.values[0] == "economia"){
   interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle('🤑 Comandos de Economia:')
    .setColor("a5d7ff")
    .addFields(
		{ name: '__Atm__', value: 'Ver quanto dinheiro você, ou outro usuário tem.' },
		{ name: '__Casar__', value: 'Casar com o amor da sua vida! Ou não...' },
    { name: '__Daily__', value: 'Pegar seu prêmio diário de dinheiros.' },
		{ name: '__Depositar__', value: 'Depositar o dinheiro que você tem na mão no banco' },
    		{ name: '__Divorciar__', value: 'Se divorciar no corno que te chifrou.' },
		{ name: '__Empregos__', value: 'Ver os empregos disponíveis e pega-los' },
    { name: '__Pay__', value: 'Transferir alguma quantia para alguém.' },
		{ name: '__Perfil__', value: 'Ver o seu perfil ou de algum outro usuário.' },
    { name: '__Rank__', value: 'Ver as pessoas mais ricas da economia do bot.' },
		{ name: '__Retirar__', value: 'Retirar o dinheiro do banco para as mãos.' },
    { name: '__Sobremim__', value: 'Alterar o conteúdo do seu sobremim do perfil.' },
		{ name: '__Work__', value: 'Trabalhar no seu emprego pego no /Empregos.' },
	)
    ]})
 }
  if(i.values[0] == "outros"){
   interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle('🌐 Outros comandos:')
    .setColor("a5d7ff")
    .addFields(
		{ name: '__Ping__', value: 'Ver o ping do bot e da Database.' },
		{ name: '__Help__', value: 'Ver uma lista de todos os comandos.' },
      )
              ]})
  }
  const test = ""
  if(i.values[0] == "Shikimori"){
    interaction.editReply({embeds: [new Discord.MessageEmbed()
     .setTitle('Shikimori')
     .setColor("a5d7ff")
     .addFields(
     { name: 'Shikimori ', value: 'Apelido: Mi-Chan\nMiccon Shikimori é a personagem principal. Ela é filha de Miyabi Shikimori e namorada de Yuu Izumi.\nShikimori é uma pessoa muito confiante, carinhosa e gentil. Ela também é uma pessoa muito competitiva. Geralmente, ela é muito fofa, mas de vez em quando seu lado legal mostra que é intimidante e incrível ao mesmo tempo. Além disso, ela ama muito Yuu Izumi e sempre cuida dele literalmente protegendo-o de todas as situações ruins que ele entra devido à sua má sorte. Ela não gosta de doces, mas quando Izumi oferece smores em um acampamento, ela os come e diz a ele que gostaria de comer isso todos os dias.' }
       )
               ]})
   }
})//collector
  
})//.then
    
  }
}
