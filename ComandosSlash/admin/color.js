const Discord = require("discord.js")
module.exports = {
  name: "color",
  description: "「🎨 | Setar uma cor 」",
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
  {
    label: 'Cor Roxa',
    emoji: '🟪',
    value: 'roxo',
},
{
  label: 'Cor Amarela',
  emoji: '🟨',
  value: 'amarelo',
},
{
  label: 'Cor Laranja',
  emoji: '🍊',
  value: 'laranja',
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
   if(i.values[0] == "roxo"){
    interaction.editReply({embeds: [new Discord.MessageEmbed()
     .setTitle('cor roxa')
     .setColor("3300ff")
 
               ]})
         let userdb = await client.userdb.findOne({
                 userID: interaction.user.id
             })
              
         if(!userdb){
                 const newuser = new client.userdb({ userID: interaction.user.id })
                 await newuser.save();
                 
                 userdb = await client.userdb.findOne({ userID: interaction.user.id })
             }
        const cor = "3300ff"
        userdb.economia.color = cor; userdb.save()
   }

   if(i.values[0] == "rosa"){
    const cor = "f200ff"
    interaction.editReply({embeds: [new Discord.MessageEmbed()
     .setTitle('cor rosa')
     .setColor(cor)
 
               ]})
         let userdb = await client.userdb.findOne({
                 userID: interaction.user.id
             })
              
         if(!userdb){
                 const newuser = new client.userdb({ userID: interaction.user.id })
                 await newuser.save();
                 
                 userdb = await client.userdb.findOne({ userID: interaction.user.id })
             }
        
        userdb.economia.color = cor; userdb.save()
   }
   if(i.values[0] == "amarelo"){
    const cor = "ffff00"
    interaction.editReply({embeds: [new Discord.MessageEmbed()
     .setTitle('cor amarela')
     .setColor(cor)
 
               ]})
         let userdb = await client.userdb.findOne({
                 userID: interaction.user.id
             })
              
         if(!userdb){
                 const newuser = new client.userdb({ userID: interaction.user.id })
                 await newuser.save();
                 
                 userdb = await client.userdb.findOne({ userID: interaction.user.id })
             }
        
        userdb.economia.color = cor; userdb.save()
   }
   if(i.values[0] == "laranja"){
    const cor = "ff8c00"
    interaction.editReply({embeds: [new Discord.MessageEmbed()
     .setTitle('cor laranja')
     .setColor(cor)
 
               ]})
         let userdb = await client.userdb.findOne({
                 userID: interaction.user.id
             })
              
         if(!userdb){
                 const newuser = new client.userdb({ userID: interaction.user.id })
                 await newuser.save();
                 
                 userdb = await client.userdb.findOne({ userID: interaction.user.id })
             }
        
        userdb.economia.color = cor; userdb.save()
   }
})//collector
  
})//.thens
    
  }
}