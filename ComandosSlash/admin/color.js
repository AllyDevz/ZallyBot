const Discord = require("discord.js")
module.exports = {
  name: "color",
  description: "Ver a lista de comandos do bot",
  type: "CHAT_INPUT",
  run: async(client, interaction) =>{
   
  const embed = new Discord.MessageEmbed()
    .setTitle('🛑Ver todas as opçoes')
    .setColor("a5d7ff")
    .setDescription('Selecione uma Cor Para Todas Embed')
  
const row = new Discord.MessageActionRow()
	.addComponents(
	new Discord.MessageSelectMenu()
    .setCustomId('menu')
	.setPlaceholder('selecione uma opçao')
	.addOptions([
		{
			label: 'Cor Padrão',
      emoji: '🎱',
			value: 'padrão',
		},
		{
	    	label: 'Azul',
        emoji: '🔷',
		    value: 'azul',
		},
		{
      label: 'Cor Verde',
      emoji: '🟩',
      value: 'verde',
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

   if(i.values[0] == "verde"){
    interaction.editReply({embeds: [new Discord.MessageEmbed()
     .setTitle('cor verde')
     .setColor("03fc41")
 
               ]})
         let userdb = await client.userdb.findOne({
                 userID: interaction.user.id
             })
              
         if(!userdb){
                 const newuser = new client.userdb({ userID: interaction.user.id })
                 await newuser.save();
                 
                 userdb = await client.userdb.findOne({ userID: interaction.user.id })
             }
        const cor = "03fc41"
        userdb.economia.color = cor; userdb.save()
   }
  if(i.values[0] == "padrão"){
   interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle('cor padrão')
    .setColor("36393e")

              ]})
        let userdb = await client.userdb.findOne({
                userID: interaction.user.id
            })
             
        if(!userdb){
                const newuser = new client.userdb({ userID: interaction.user.id })
                await newuser.save();
                
                userdb = await client.userdb.findOne({ userID: interaction.user.id })
            }
       const cor = "36393e"
       userdb.economia.color = cor; userdb.save()
  }
  const test = ""
  if(i.values[0] == "azul"){
    interaction.editReply({embeds: [new Discord.MessageEmbed()
     .setTitle('cor azul')
     .setColor("0352fc")
 
               ]})
         let userdb = await client.userdb.findOne({
                 userID: interaction.user.id
             })
              
         if(!userdb){
                 const newuser = new client.userdb({ userID: interaction.user.id })
                 await newuser.save();
                 
                 userdb = await client.userdb.findOne({ userID: interaction.user.id })
             }
        const cor = "0352fc"
        userdb.economia.color = cor; userdb.save()
   }
})//collector
  
})//.then
    
  }
}