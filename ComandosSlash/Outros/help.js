const Discord = require("discord.js")
module.exports = {
  name: "menu",
  description: "Ver a lista de comandos do bot",
  type: "CHAT_INPUT",
  run: async(client, interaction) =>{
  const userId = interaction.member.user.id;
      
  const user = client.users.cache.find(user => user.id === userId)

      
  const userdb = await client.userdb.findOne({
        userID: user.id
    }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
    
    
  const embed = new Discord.MessageEmbed()
    .setTitle(`${client.user.username}`)
    .setThumbnail(client.user.avatarURL())
    .setColor(userdb.economia.color)
    .setDescription('Selecione uma categoria de comandos para ver.')
  
const row = new Discord.MessageActionRow()
	.addComponents(
	new Discord.MessageSelectMenu()
    .setCustomId('menu')
	.setPlaceholder('selecione uma categoria de comandos.')
	.addOptions([
		{
			label: 'Economia',
      emoji: '💫',
			value: 'economia',
		},
		{
	    	label: 'Comandos',
        emoji: '💤',
		    value: 'outros',
		},
		{
      label: 'Ping',
      emoji: '🌐',
      value: 'Ping',
  },
  {
    label: 'Admin',
    emoji: '🛑',
    value: 'admin',
},
		{
			label: 'Avatar',
      emoji: '🖤',
			value: 'avatar',
		},
  {
    label: 'Exit',
    emoji: '🧧',
    value: 'end',
},
	]),
			);

interaction.reply({embeds: [embed], components: [row], fetchReply: true}).then(msg => {

  const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });

collector.on('collect', async i => {
  const user = interaction
  const userdb = await client.userdb.findOne({
      userID: user.id
  }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
  
  if(i.user.id != interaction.user.id) return i.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`${client.user.username}`)
    .setThumbnail(client.user.avatarURL())
    .setColor(userdb.economia.color)
    .setDescription(`Shiki: Muita calma hessa hora você não solicitou o comando`)
], ephemeral: true})

   i.deferUpdate()

 if(i.values[0] == "economia"){
  const userId = interaction.member.user.id;
      
  const user = client.users.cache.find(user => user.id === userId)

    
  const userdb = await client.userdb.findOne({
      userID: user.id
  }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
  
  atmb = `
            
            
  ╭━═[🎇ZallyBot Menu🎇]═━━⪨
  
  __Atm__: Ver quanto dinheiro você, ou outro usuário tem.
  __Casar__: value: Casar com o amor da sua vida! Ou não...
  __Daily__ Pegar seu prêmio diário de dinheiros.
  __Depositar__ Depositar o dinheiro que você tem na mão no banco
  __Divorciar__: Se divorciar no corno que te chifrou.
  __Empregos__: Ver os empregos disponíveis e pega-los
  __Pay__: Transferir alguma quantia para alguém.
  __Perfil__: 'Ver o seu perfil ou de algum outro usuário.
  __Rank__: Ver as pessoas mais ricas da economia do bot.
  __Retirar__: Retirar o dinheiro do banco para as mãos.
  __Sobremim__: Alterar o conteúdo do seu sobremim do perfil.
  __Work__: Trabalhar no seu emprego pego no /Empregos.
    
  ╰━━━━━━━━━━━━━━━━━━━━━━⪨
`
   interaction.editReply({embeds: [new Discord.MessageEmbed()
    
    .setThumbnail(client.user.avatarURL())
    .setImage("https://i.imgur.com/JJcMsox.gif")
    .setColor(userdb.economia.color)
    .setDescription(atmb)
    ]})
 }
  if(i.values[0] == "outros"){
    const userId = interaction.member.user.id;
      
    const user = client.users.cache.find(user => user.id === userId)

      
    const userdb = await client.userdb.findOne({
        userID: user.id
    }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
    
    
   interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle('💫 Comandos')
    .setThumbnail(client.user.avatarURL())
    .setImage("https://i.imgur.com/JJcMsox.gif")
    .setColor(userdb.economia.color)
    .addFields(
		{ name: '__avatar__', value: 'Ver o Avatar de Alguem Mencionado' },
		{ name: '__menu__', value: 'Ver uma lista de todos os comandos.' },
    { name: '__invite__', value: 'convidar para o servidor' },
    { name: '__serverinfo__', value: 'ver informaçoes do servidor' },
      )
              ]})
  }
  if(i.values[0] == "end"){

    interaction.editReply({embeds: [new Discord.MessageEmbed()
     .setTitle('🧧 Encerrando Menu')
               ]}).then(msg => {
                msg.delete({ timeout: 10000 /*time unitl delete in milliseconds*/});
            })
   }
  if(i.values[0] == "admin"){
    const userId = interaction.member.user.id;
      
    const user = client.users.cache.find(user => user.id === userId)

      
    const userdb = await client.userdb.findOne({
        userID: user.id
    }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
    
    
    interaction.editReply({embeds: [new Discord.MessageEmbed()
     .setTitle('🌐 Administração')
     .setThumbnail(client.user.avatarURL())
     .setColor(userdb.economia.color)
     .setImage("https://i.imgur.com/JJcMsox.gif")
     .addFields(
     { name: '__setwelcome__', value: 'Configurar welcome' },
     { name: '__emoji__', value: 'Pega Informaçao Do emoji' },
       )
               ]})
   }
  if(i.values[0] == "avatar"){
    
    const userId = interaction.member.user.id;
      
    const user = client.users.cache.find(user => user.id === userId)

      
    const userdb = await client.userdb.findOne({
        userID: user.id
    }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
    
    
        interaction.editReply({embeds: [new Discord.MessageEmbed()
          .setTitle(`${user.username}'s Avatar`)
          .setColor(userdb.economia.color)
          .setDescription(`[Png](${user.avatarURL({ format: 'png' })}) | [Webp](${user.avatarURL({ dynamic: true })}) | [Jpg](${user.avatarURL({ format: 'jpg' })})`)
          
          .setImage(user.displayAvatarURL({
            dynamic: true,
            size: 1024
        }))
      
          
    ]});
   }
  const test = ""

   if(i.values[0] == "Ping"){
    const userId = interaction.member.user.id;
      
    const user = client.users.cache.find(user => user.id === userId)

      
    const userdb = await client.userdb.findOne({
        userID: user.id
    }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
    
         
    const st = process.hrtime()   
    await client.userdb.findOne({
     userid: interaction.member.id,
   });         
    const sto = process.hrtime(st)
       
    const pingDB = Math.round((sto[0] * 1e9 + sto[1]) / 1e6);
    interaction.editReply({embeds: [new Discord.MessageEmbed()
      .setColor(userdb.economia.color)
      .setImage("https://i.imgur.com/JJcMsox.gif")
      .setThumbnail(client.user.avatarURL())
       .setTitle("🎾 ****»**** **PONG!**")
        .setDescription(`> **ping do bot** \`${client.ws.ping}\`**ms!**
> **Mongodb:** \`${pingDB}\` **ms!**`)
               ]})
   }
})//collector
  
})//.then
    
  }
}
