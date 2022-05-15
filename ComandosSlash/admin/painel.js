const Discord = require("discord.js")
module.exports = {
  name: "painellock",
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
			label: 'Lock',
      emoji: '🤑',
			value: 'lock',
		},
		{
	    	label: 'Menu',
        emoji: '🌐',
		    value: 'menu1',
		},
		{
      label: 'Unlock',
      emoji: '🎁',
      value: 'unlock',
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

 if(i.values[0] == "unlock"){
   interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle('Unlocked')
    .setColor("a5d7ff")
    ]})
 }
  if(i.values[0] == "menu1"){
   interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle('🌐 Outros comandos:')
    .setColor("a5d7ff")
    .addFields(
		{ name: '__Unlock__', value: 'abrir canal' },
		{ name: '__Lock__', value: 'fechar canal' },
      )
              ]})
  }
  const test = ""
  if(i.values[0] == "lock"){
    interaction.editReply({embeds: [new Discord.MessageEmbed()
     .setTitle('Locked')
     .setColor("a5d7ff")

               ]})
    let ferinha_perm = interaction.member.permissions.has("MANAGE_GUILD");
    let ferinha_perm_erro_msg = `:x: | ${interaction.author} Você não possui a permissão **Gerenciar Servidor**.`;
    if (!ferinha_perm) return interaction.channel.send(ferinha_perm_erro_msg);
       
    await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.cache.find(fera => fera.name.toLowerCase().trim() == "@everyone"),
               {
                   SEND_MESSAGES: true
               });
               
       
   }
})//collector
  
})//.then
    
  }
}
