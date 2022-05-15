const Discord = require("discord.js")
module.exports = {
  name: "menu",
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
      label: 'Shikimori',
      emoji: '🎁',
      value: 'Shikimori',
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

  if(i.user.id != interaction.user.id) return i.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👨 Calma ae...`)
    .setColor("#7e008f")
    .setDescription(`Só quem solicitou o menu pode usá-lo.`)
], ephemeral: true})

   i.deferUpdate()

 if(i.values[0] == "economia"){
   interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle('🤑 Comandos de Economia:')
    .setColor("#7e008f")
    .addFields(
		{ name: '__Atm__', value: 'Ver quanto dinheiro você, ou outro usuário tem.' },
		{ name: '__Casar__', value: 'Casar com o amor da sua vida! Ou não...' },
    { name: '__Daily__', value: 'Pegar seu prêmio diário de dinheiros.' },
		{ name: '__Depositar__', value: 'Depositar o dinheiro que você tem na mão no banco' },
    		{ name: '__Divorciar__', value: 'Se divorciar no corno que te chifrou.'},
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
    .setTitle('💫 Comandos')
    .setColor("#7e008f")
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
    interaction.editReply({embeds: [new Discord.MessageEmbed()
     .setTitle('🌐 Administração')
     .setColor("#7e008f")
     .addFields(
     { name: '__setwelcome__', value: 'Configurar welcome' },
     { name: '__emoji__', value: 'Pega Informaçao Do emoji' },
       )
               ]})
   }
  if(i.values[0] == "avatar"){
    const userId = interaction.member.user.id;
      
    const user = client.users.cache.find(user => user.id === userId)


    
        interaction.editReply({embeds: [new Discord.MessageEmbed()
          .setTitle(`${user.username}'s Avatar`)
          .setColor("#7e008f")
          .setDescription(`[Png](${user.avatarURL({ format: 'png' })}) | [Webp](${user.avatarURL({ dynamic: true })}) | [Jpg](${user.avatarURL({ format: 'jpg' })})`)
          
          .setImage(user.displayAvatarURL({
            dynamic: true,
            size: 1024
        }))
      
          
    ]});
   }
  const test = ""
  if(i.values[0] == "Shikimori"){
    interaction.editReply({embeds: [new Discord.MessageEmbed()
     .setTitle('Shikimori')
     .setColor("#7e008f")
     .addFields(
     { name: 'Shikimori ', value: 'Apelido: Mi-Chan\nMiccon Shikimori é a personagem principal. Ela é filha de Miyabi Shikimori e namorada de Yuu Izumi.\nShikimori é uma pessoa muito confiante, carinhosa e gentil. Ela também é uma pessoa muito competitiva. Geralmente, ela é muito fofa, mas de vez em quando seu lado legal mostra que é intimidante e incrível ao mesmo tempo. Além disso, ela ama muito Yuu Izumi e sempre cuida dele literalmente protegendo-o de todas as situações ruins que ele entra devido à sua má sorte. Ela não gosta de doces, mas quando Izumi oferece smores em um acampamento, ela os come e diz a ele que gostaria de comer isso todos os dias.' }
       )
               ]})
   }
   if(i.values[0] == "Ping"){
    const st = process.hrtime()   
    await client.userdb.findOne({
     userid: interaction.member.id,
   });         
    const sto = process.hrtime(st)
       
    const pingDB = Math.round((sto[0] * 1e9 + sto[1]) / 1e6);
    interaction.editReply({embeds: [new Discord.MessageEmbed()
      .setColor("#7e008f")
       .setTitle("🎾 ****»**** **PONG!**")
        .setDescription(`> **ping do bot** \`${client.ws.ping}\`**ms!**
> **Mongodb:** \`${pingDB}\` **ms!**`)
               ]})
   }
})//collector
  
})//.then
    
  }
}
