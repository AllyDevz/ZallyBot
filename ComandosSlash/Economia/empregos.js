const Discord = require("discord.js")
module.exports = {
  name: "empregos",
  description: "pegar um emprego",
  type: "CHAT_INPUT",
  run: async(client, interaction) =>{
   
   let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: interaction.user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: interaction.user.id })
     }
     empregos2 = `
            
            
     โญโโ[๐ซ๐ฉ๐ช๐ต๐ต๐๐ซ]โโโโชจ
     ๐ข๐ฎ๐ต๐ฎ๐ฌ๐ฒ๐ธ๐ท๐ฎ ๐พ๐ถ ๐ฎ๐ถ๐น๐ป๐ฎ๐ฐ๐ธ ๐น๐ช๐ป๐ช ๐ฟ๐ฎ๐ป ๐ฒ๐ท๐ฏ๐ธ๐ป๐ถ๐ชรงรต๐ฎ๐ผ ๐ฎ ๐น๐ฎ๐ฐ๐ช-๐ต๐ธ\n๐๐ถ๐น๐ถ ๐ธ๐๐๐๐๐๐ ๐๐๐ ๐๐ ๐ธ๐๐๐๐น๐๐๐ ๐ ๐๐๐ถ๐๐๐พ๐ถ ๐น๐ ๐น๐พ๐๐ฝ๐๐พ๐๐ ๐๐ถ๐๐ฝ๐ถ ๐น๐พ๐ป๐๐๐๐๐๐๐, ๐๐๐ถ๐๐๐ ๐๐ถ๐พ๐๐ ๐ ๐น๐พ๐๐ฝ๐๐พ๐๐ ๐๐ถ๐๐ฝ๐, ๐๐ถ๐พ๐ ๐๐๐๐๐ ๐น๐ ๐ธ๐๐๐๐น๐๐๐ ๐๐ถ๐พ ๐๐๐พ๐๐๐พ๐.
     โฐโโโโโโโโโโโโโโโโโโโโโโโชจ
`
  const embed = new Discord.MessageEmbed()
    .setTitle('๐ฎ๐๐๐๐ธ๐พ๐๐๐ ๐๐ ๐๐๐๐๐๐๐')
    .setColor("a5d7ff")
    .setDescription(empregos2)
  
const row = new Discord.MessageActionRow()
	.addComponents(
	new Discord.MessageSelectMenu()
    .setCustomId('menu')
	.setPlaceholder('selecione algum emprego')
	.addOptions([
		{
			label: 'uber',
            emoji: '๐',
			value: 'uber',
		},
		{
	    	label: 'entregador de pizza',
            emoji: '๐',
		    value: 'pizza',
		},
		{
			label: 'frentista',
            emoji: 'โฝ',
			value: 'frentista',
		},
		{
			label: 'caminheiro',
            emoji: '๐',
			value: 'caminhao',
		},
		{
			label: 'sedex',
            emoji: '๐ฆ',
			value: 'sedex',
		},
		 {
			label: 'pescador',
            emoji: '๐ฃ',
			value: 'peixe',
		},
		{
			label: 'TI',
            emoji: '๐ป',
			value: 'ti',
		},
	]),
			);

interaction.reply({embeds: [embed], components: [row], fetchReply: true}).then(msg => {

  const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });

collector.on('collect', async i => {

  if(i.user.id != interaction.user.id) return i.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`๐จ Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Sรณ quem solicitou o menu pode usรก-lo.`)
], ephemeral: true})

   i.deferUpdate()

  if(i.componentType == 'BUTTON') {

   if(Date.now() < userdb.cooldowns.trabalho){ 
    const calc = userdb.cooldowns.trabalho - Date.now()
    return interaction.followUp({embeds: [new Discord.MessageEmbed()
    .setTitle(`๐ถ Calma...`)
    .setColor("a5d7ff")
    .setDescription(`**Espera ae!** Vocรช sรณ pode trocar de emprego 1 vez por semana.
> *Ainda falta **__${ms(calc).days}d ${ms(calc).hours}h ${ms(calc).minutes}m__** para vocรช poder trocar novamente.*`)
], ephemeral: true})
   }
  const button = i.customId.split("_")[1]
  
  if(button == userdb.economia.trabalho .trampo) return interaction.followUp({embeds: [new Discord.MessageEmbed()
    .setTitle(`โ Dรก nรฃo filhรฃo...`)
    .setColor("a5d7ff")
    .setDescription(`**Calma!** Vocรช jรก estรก com este emprego.`)
], ephemeral: true})
  
  let trabalho,
      cooldown,
      maxmoney;
  
  switch (button) {
      
  case "uber":
    trabalho = "uber"
    cooldown = 1000 * 60 * 45
    maxmoney = 1000
  break;
  
  case "pizza":
    trabalho = "pizza"
    cooldown = 1000 * 60 * 90
    maxmoney = 1500
  break;
  
  case "frentista":
    trabalho = "frentista"
    cooldown = 1000 * 60 * 180
    maxmoney = 2500
  break;
  
  case "cominhao":
    trabalho = "caminhoneiro"
    cooldown = 1000 * 60 * 300
    maxmoney = 3500
  break;
  
  case "sedex":
    trabalho = "sedex"
    cooldown = 1000 * 60 * 420
    maxmoney = 6000
  break;
  
  case "pescador":
    trabalho = "pescador"
    cooldown = 1000 * 60 * 540
    maxmoney = 8500
  break;
  
  case "ti":
    trabalho = "ti"
    cooldown = 1000 * 60 * 600
    maxmoney = 10000
  break;
  }
  
  interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`โ๏ธ Vocรช entrou em um novo emprego!`)
    .setColor("a5d7ff")
    .setDescription(`**Certo!** Vocรช pegou um novo emprego.`)
], components: []})
  
  await client.userdb.updateOne({
      userID: interaction.user.id
  },{ $set: {
          "cooldowns.trabalho": Date.now() + 604800000,
          "economia.registro": "true",
          "economia.background": "https://media.discordapp.net/attachments/1037851726864207942/1046878244303032330/629544.jpg?width=841&height=473",
          "economia.usuario": interaction.user.tag,
          "economia.trabalho":{
            maxmoney: maxmoney,
            trampo: trabalho,
            cooldown: cooldown
          }
      }
    }
  )
  }
   
  if(i.componentType == 'SELECT_MENU')  {
  const select = i.values[0]

    if(select == 'uber'){
        
      interaction.editReply({embeds: [msgembed("๐", "uber", "45m", 1)], components: [row, button("uber")]})
      
    }
    
        if(select == 'pizza'){

      interaction.editReply({embeds: [msgembed("๐", "entregador de pizza", "1h", 1.5)], components: [row, button("pizza")]})
    }
    
    if(select == 'frentista'){
      
      interaction.editReply({embeds: [msgembed("โฝ", "frentista", "3h", 2.5)], components: [row, button("frentista")]})
   
    }
    
    if(select == 'caminhao'){
        
      interaction.editReply({embeds: [msgembed("๐", "caminhoneiro", "5h", 3.5)], components: [row, button("cominhao")]})
   
    }
    
    if(select == 'sedex'){
        
      interaction.editReply({embeds: [msgembed("๐ฆ", "entregador de sedex", "7h", 6)], components: [row, button("sedex")]})
    }
    
    if(select == 'peixe'){
        
      interaction.editReply({embeds: [msgembed("๐ฃ", "pescador", "9h", 8.5)], components: [row, button("pescador")]})
      
    }
    
    if(select == 'ti'){
        
      interaction.editReply({embeds: [msgembed("๐ป", "chefe de ti", "10h", 10)], components: [row, button("ti")]})
      
    }
    if(select == "shikieco"){
      const embed = new Discord.MessageEmbed()
      .setTitle(`${client.user.username}`)
      .setThumbnail(client.user.avatarURL())
      .setColor("a5d7ff")
      .setDescription('Selecione uma categoria de comandos para ver.')
    
  const row = new Discord.MessageActionRow()
    .addComponents(
    new Discord.MessageSelectMenu()
      .setCustomId('menu')
    .setPlaceholder('selecione uma categoria de comandos.')
    .addOptions([
      {
        label: 'Atm',
        emoji: '๐ซ',
        value: 'atm',
      },
      {
          label: 'Empregos',
          emoji: '๐ค',
          value: 'empregos',
      },
      {
        label: 'Trabalhar',
        emoji: '๐',
        value: 'trabalhar',
    },
      {
        label: 'Daily',
        emoji: '๐',
        value: 'daily',
    },
    ]),
        );
  
  interaction.editReply({embeds: [embed], components: [row], fetchReply: true}).then(msg => {
  
    const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });
  
  collector.on('collect', async i => {
  
    if(i.user.id != interaction.user.id) return i.reply({embeds: [new Discord.MessageEmbed()
      .setTitle(`${client.user.username}`)
      .setThumbnail(client.user.avatarURL())
      .setColor("#7e008f")
      .setDescription(`Shiki: Muita calma hessa hora vocรช nรฃo solicitou o comando`)
  ], ephemeral: true})
  
     i.deferUpdate()
  
   if(i.values[0] == "atm"){
    const user = interaction.user
    async function botparse(user) {
       if(user === true){
           interaction.reply("Bot Nรฃo Possui Atm")
       } else {
           const user = interaction.options.getUser("user") || interaction.user
           const userdb = await client.userdb.findOne({
               userID: user.id
           }) || { economia: { banco: 0, money: 0}}
            
           interaction.editReply({embeds: [new Discord.MessageEmbed()
           .setTitle(`${user.username}`)
           .setColor("a5d7ff")
           .setDescription(`> ๐ธ Dinheiro: ${userdb.economia.money}
      > ๐ฆ Dinheiro no banco: ${userdb.economia.banco}
      > ๐ฑ Dinheiro total: ${userdb.economia.money + userdb.economia.banco}`)
                ]})  
       }
    }
   botparse(user.bot)
   }
  
  
   //----------Empregos
    if(i.values[0] == "empregos"){
  
      let userdb = await client.userdb.findOne({
        userID: interaction.user.id
    })
     
    if(!userdb){
        const newuser = new client.userdb({ userID: interaction.user.id })
        await newuser.save();
        
        userdb = await client.userdb.findOne({ userID: interaction.user.id })
    }
  
  const embed = new Discord.MessageEmbed()
   .setTitle('๐ค Escolha o melhor trabalho pra vocรช!')
   .setColor("a5d7ff")
   .setDescription('Selecione um emprego para ver informaรงรตes e pega-lo\nCada Emprego tem um cooldown e quantia de dinheiro ganha diferentes, quanto maior o dinheiro ganho, mais tempo de cooldown vai existir.')
  
  const row = new Discord.MessageActionRow()
  .addComponents(
  new Discord.MessageSelectMenu()
   .setCustomId('menu')
  .setPlaceholder('selecione algum emprego')
  .addOptions([
   {
     label: 'uber',
           emoji: '๐',
     value: 'uber',
   },
   {
       label: 'entregador de pizza',
           emoji: '๐',
       value: 'pizza',
   },
   {
     label: 'frentista',
           emoji: 'โฝ',
     value: 'frentista',
   },
   {
     label: 'caminheiro',
           emoji: '๐',
     value: 'caminhao',
   },
   {
     label: 'sedex',
           emoji: '๐ฆ',
     value: 'sedex',
   },
    {
     label: 'pescador',
           emoji: '๐ฃ',
     value: 'peixe',
   },
   {
     label: 'TI',
           emoji: '๐ป',
     value: 'ti',
   }
  ]),
     );
  
  interaction.editReply({embeds: [embed], components: [row], fetchReply: true}).then(msg => {
  
  const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });
  
  collector.on('collect', async i => {
  
  if(i.user.id != interaction.user.id) return i.followUp({embeds: [new Discord.MessageEmbed()
   .setTitle(`๐จ Calma ae...`)
   .setColor("a5d7ff")
   .setDescription(`Sรณ quem solicitou o menu pode usรก-lo.`)
  ], ephemeral: true})
  
  i.deferUpdate()
  
  if(i.componentType == 'BUTTON') {
  
  if(Date.now() < userdb.cooldowns.trabalho){ 
   const calc = userdb.cooldowns.trabalho - Date.now()
   return interaction.followUp({embeds: [new Discord.MessageEmbed()
   .setTitle(`๐ถ Calma...`)
   .setColor("a5d7ff")
   .setDescription(`**Espera ae!** Vocรช sรณ pode trocar de emprego 1 vez por semana.
  > *Ainda falta **__${ms(calc).days}d ${ms(calc).hours}h ${ms(calc).minutes}m__** para vocรช poder trocar novamente.*`)
  ], ephemeral: true})
  }
  const button = i.customId.split("_")[1]
  
  if(button == userdb.economia.trabalho .trampo) return interaction.followUp({embeds: [new Discord.MessageEmbed()
   .setTitle(`โ Dรก nรฃo filhรฃo...`)
   .setColor("a5d7ff")
   .setDescription(`**Calma!** Vocรช jรก estรก com este emprego.`)
  ], ephemeral: true})
  
  let trabalho,
     cooldown,
     maxmoney;
  
  switch (button) {
     
  case "uber":
   trabalho = "uber"
   cooldown = 1000 * 60 * 45
   maxmoney = 1000
  break;
  
  case "pizza":
   trabalho = "pizza"
   cooldown = 1000 * 60 * 90
   maxmoney = 1500
  break;
  
  case "frentista":
   trabalho = "frentista"
   cooldown = 1000 * 60 * 180
   maxmoney = 2500
  break;
  
  case "cominhao":
   trabalho = "caminhoneiro"
   cooldown = 1000 * 60 * 300
   maxmoney = 3500
  break;
  
  case "sedex":
   trabalho = "sedex"
   cooldown = 1000 * 60 * 420
   maxmoney = 6000
  break;
  
  case "pescador":
   trabalho = "pescador"
   cooldown = 1000 * 60 * 540
   maxmoney = 8500
  break;
  
  case "ti":
   trabalho = "ti"
   cooldown = 1000 * 60 * 600
   maxmoney = 10000
  break;
  }
  
  
  
  await client.userdb.updateOne({
     userID: interaction.user.id
  },{ $set: {
         "cooldowns.trabalho": Date.now() + 604800000,
         "economia.trabalho":{
           maxmoney: maxmoney,
           trampo: trabalho,
           cooldown: cooldown
         }
     }
   }
  )
  }
  
  if(i.componentType == 'SELECT_MENU')  {
  const select = i.values[0]
  
   if(select == 'uber'){
       
     interaction.editReply({embeds: [msgembed("๐", "uber", "45m", 1)], components: [row, button("uber")]})
     
   }
   
       if(select == 'pizza'){
  
     interaction.editReply({embeds: [msgembed("๐", "entregador de pizza", "1h", 1.5)], components: [row, button("pizza")]})
   }
   
   if(select == 'frentista'){
     
     interaction.editReply({embeds: [msgembed("โฝ", "frentista", "3h", 2.5)], components: [row, button("frentista")]})
  
   }
   
   if(select == 'caminhao'){
       
     interaction.editReply({embeds: [msgembed("๐", "caminhoneiro", "5h", 3.5)], components: [row, button("cominhao")]})
  
   }
   
   if(select == 'sedex'){
       
     interaction.editReply({embeds: [msgembed("๐ฆ", "entregador de sedex", "7h", 6)], components: [row, button("sedex")]})
   }
   
   if(select == 'peixe'){
       
     interaction.editReply({embeds: [msgembed("๐ฃ", "pescador", "9h", 8.5)], components: [row, button("pescador")]})
     
   }
   
   if(select == 'ti'){
       
     interaction.editReply({embeds: [msgembed("๐ป", "chefe de ti", "10h", 10)], components: [row, button("ti")]})
     
   }
   
  }//if menus
  
  })//collector
  
  })//.then
  
  
  function msgembed(emoji, emprego, cooldown, ganhos){
    return new Discord.MessageEmbed()
    .setTitle(`${emoji} Emprego de ${emprego}.`)
    .setColor("a5d7ff")
    .setDescription(`๐ Cooldown no comando de work: ${cooldown} \n๐ธ Ganhos mรกximo: ${ganhos}k`)
  }
  
  function button(String){
    return new Discord.MessageActionRow()
  .addComponents(
    new Discord.MessageButton()
    .setCustomId(`aceitar_${String}`)
    .setLabel('Pegar emprego')
    .setStyle('SECONDARY'),
      );
  }
  
  function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)
  
  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
  }
  
  
  
  
    }
    if(i.values[0] == "daily"){
      let userdb = await client.userdb.findOne({
        userID: interaction.user.id
    })
     
    if(!userdb){
        const newuser = new client.userdb({ userID: interaction.user.id })
        await newuser.save();
        
        userdb = await client.userdb.findOne({ userID: interaction.user.id })
    }
     
   if(Date.now() < userdb.cooldowns.daily){
     const calc = userdb.cooldowns.daily - Date.now()
     
        return interaction.editReply({embeds: [new Discord.MessageEmbed()
   .setTitle(`Vish`)
   .setColor("a5d7ff")
   .setDescription(`Ainda falta ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s para vocรช pegar o Pagamento novamente.`)
  ], ephemeral: true})
    }  
     
     const dinheiro = Math.floor(Math.random() * 5000) + 5000
  
    await client.userdb.updateOne({
        userID: interaction.user.id
    }, { $set: {
        "economia.money": userdb.economia.money + dinheiro,
        "cooldowns.daily": Date.now() + 86400000
    }
    })
    
   interaction.editReply({embeds: [new Discord.MessageEmbed()
   .setTitle(`๐ธ seu pagamento diario foi recebido`)
   .setColor("a5d7ff")
   .setDescription(`verifique seu banco ${abreviar(dinheiro)}$`)
  ]})
  function abreviar(number, precision=2) {
    return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
  }
  function ms(ms) {
    const seconds = ~~(ms/1000)
    const minutes = ~~(seconds/60)
    const hours = ~~(minutes/60)
    const days = ~~(hours/24)
  
    return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
  }
     }
    if(i.values[0] == "admin"){
      interaction.editReply({embeds: [new Discord.MessageEmbed()
       .setTitle('๐ Administraรงรฃo')
       .setThumbnail(client.user.avatarURL())
       .setColor("#7e008f")
       .addFields(
       { name: '__setwelcome__', value: 'Configurar welcome' },
       { name: '__emoji__', value: 'Pega Informaรงao Do emoji' },
         )
                 ]})
     }
    if(i.values[0] == "trabalhar"){
      let userdb = await client.userdb.findOne({
        userID: interaction.user.id
    })
     
    if(!userdb || !userdb.economia.trabalho.trampo){
        return interaction.editReply({embeds: [new Discord.MessageEmbed()
   .setTitle(`โ Dรก nรฃo filhรฃo...`)
   .setColor("a5d7ff")
   .setDescription(`**Calma!** Vocรช ainda nรฃo tem um emprego, digite /empregos para ver a lista de empregos e escolher algum.`)
  ], ephemeral: true})
    }
     
   if(Date.now() < userdb.cooldowns.work){
     const calc = userdb.cooldowns.work - Date.now()
     
        return interaction.editReply({embeds: [new Discord.MessageEmbed()
   .setTitle(`๐ค Calma ae amigo...`)
   .setColor("a5d7ff")
   .setDescription(`Ainda falta ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s para vocรช trabalhar novamente.`)
  ], ephemeral: true})
    }  
     
   let frase,
       emprego;
         
   switch (userdb.economia.trabalho .trampo){
     
  case "lixeiro":
   emprego = "๐๏ธ lixeiro"
   frase = ["juntou 20 sacos lixos", "dirigiu o caminhรฃo de lixo por 2 horas"]
  break;
  
  case "pizza":
   emprego = "๐ entregador de pizza"
   frase = ["entregou 8 pizzas", "trabalhou por 3 horas"]
  break;
  
  case "frentista":
   emprego = "โฝ frentista"
   frase = ["abasteceu 28 carros", "trocou o รณleo de 8 caminhรตes"]
  break;
  
  case "caminhoneiro":
   emprego = "๐ caminhoneiro"
   frase = ["uma carga de Rondรดnia levou atรฉ Porto velho", "fez 2 entregas em 1 dia"]
  break;
  
  case "sedex":
   emprego = "๐ฆ entregador do sedex"
   frase = ["entegou 20 pacotes"]
  break;
  
  case "pescador":
   emprego = "๐ฃ pescador"
   frase = ["pescou 20 bagres", "pescou um peixe lendรกrio no laguinho do seu Zรฉ"]
  break;
  
  case "ti":
   emprego = "๐ป tรฉcnico de ti"
   frase = ["arrumou 7 computadores de pessoas que clicaram em mรฃes solteias", "desenvolveu um software para poder abrir links porno na sua empresa."]
  break;
  }
     
     const mxmn = userdb.economia.trabalho.maxmoney / 2
     
     const dinheiro = Math.floor(Math.random() * mxmn) + mxmn
  
    await client.userdb.updateOne({
        userID: interaction.user.id
    }, { $set: {
        "economia.money": userdb.economia.money + dinheiro,
        "cooldowns.work": Date.now() + userdb.economia.trabalho.cooldown
    }
    })
    
   frase = frase[Math.floor(Math.random() * frase.length)]
    
   interaction.editReply({embeds: [new Discord.MessageEmbed()
   .setTitle(`๐ธ Trabalho feito! `)
   .setColor("a5d7ff")
   .setDescription(`**Ta na mรฃo chefia!** Vocรช ${frase} como ${emprego} e ganhou ๐ค ${dinheiro} dinheiros.`)
  ]})
  function ms(ms) {
    const seconds = ~~(ms/1000)
    const minutes = ~~(seconds/60)
    const hours = ~~(minutes/60)
    const days = ~~(hours/24)
  
    return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
  }
     }
    const test = ""
    if(i.values[0] == "Shikimori"){
      interaction.editReply({embeds: [new Discord.MessageEmbed()
       .setTitle('Shikimori')
       .setThumbnail(client.user.avatarURL())
       .setColor("#7e008f")
       .addFields(
       { name: 'Shikimori ', value: 'Apelido: Mi-Chan\nMiccon Shikimori รฉ a personagem principal. Ela รฉ filha de Miyabi Shikimori e namorada de Yuu Izumi.\nShikimori รฉ uma pessoa muito confiante, carinhosa e gentil. Ela tambรฉm รฉ uma pessoa muito competitiva. Geralmente, ela รฉ muito fofa, mas de vez em quando seu lado legal mostra que รฉ intimidante e incrรญvel ao mesmo tempo. Alรฉm disso, ela ama muito Yuu Izumi e sempre cuida dele literalmente protegendo-o de todas as situaรงรตes ruins que ele entra devido ร? sua mรก sorte. Ela nรฃo gosta de doces, mas quando Izumi oferece smores em um acampamento, ela os come e diz a ele que gostaria de comer isso todos os dias.' }
         )
                 ]})
     }
     if(i.values[0] == "rank"){
  
     }
  })//collector
    
  })//.then

    }
    
  }//if menus
  
})//collector
  
})//.then
    
  }
}

function msgembed(emoji, emprego, cooldown, ganhos){
    return new Discord.MessageEmbed()
    .setTitle(`${emoji} Emprego de ${emprego}.`)
    .setColor("a5d7ff")
    .setDescription(`๐ Cooldown no comando de work: ${cooldown} \n๐ธ Ganhos mรกximo: ${ganhos}k`)
}

function button(String){
    return new Discord.MessageActionRow()
	.addComponents(
		new Discord.MessageButton()
		.setCustomId(`aceitar_${String}`)
		.setLabel('Pegar emprego')
		.setStyle('SECONDARY'),
			);
}

function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}
