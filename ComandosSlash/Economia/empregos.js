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
   
  const embed = new Discord.MessageEmbed()
    .setTitle('🤑 Escolha o melhor trabalho pra você!')
    .setColor("a5d7ff")
    .setDescription('Selecione um emprego para ver informações e pega-lo\nCada Emprego tem um cooldown e quantia de dinheiro ganha diferentes, quanto maior o dinheiro ganho, mais tempo de cooldown vai existir.')
  
const row = new Discord.MessageActionRow()
	.addComponents(
	new Discord.MessageSelectMenu()
    .setCustomId('menu')
	.setPlaceholder('selecione algum emprego')
	.addOptions([
		{
			label: 'lixeiro',
            emoji: '🗑️',
			value: 'lixeiro',
		},
		{
	    	label: 'entregador de pizza',
            emoji: '🍕',
		    value: 'pizza',
		},
		{
			label: 'frentista',
            emoji: '⛽',
			value: 'frentista',
		},
		{
			label: 'caminheiro',
            emoji: '🚛',
			value: 'caminhao',
		},
		{
			label: 'sedex',
            emoji: '📦',
			value: 'sedex',
		},
		 {
			label: 'pescador',
            emoji: '🎣',
			value: 'peixe',
		},
		{
			label: 'TI',
            emoji: '💻',
			value: 'ti',
		},
    {
      label: 'ShikiEco',
            emoji: '🍘',
      value: 'shikieco',
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

  if(i.componentType == 'BUTTON') {

   if(Date.now() < userdb.cooldowns.trabalho){ 
    const calc = userdb.cooldowns.trabalho - Date.now()
    return interaction.followUp({embeds: [new Discord.MessageEmbed()
    .setTitle(`😶 Calma...`)
    .setColor("a5d7ff")
    .setDescription(`**Espera ae!** Você só pode trocar de emprego 1 vez por semana.
> *Ainda falta **__${ms(calc).days}d ${ms(calc).hours}h ${ms(calc).minutes}m__** para você poder trocar novamente.*`)
], ephemeral: true})
   }
  const button = i.customId.split("_")[1]
  
  if(button == userdb.economia.trabalho .trampo) return interaction.followUp({embeds: [new Discord.MessageEmbed()
    .setTitle(`✋ Dá não filhão...`)
    .setColor("a5d7ff")
    .setDescription(`**Calma!** Você já está com este emprego.`)
], ephemeral: true})
  
  let trabalho,
      cooldown,
      maxmoney;
  
  switch (button) {
      
  case "lixeiro":
    trabalho = "lixeiro"
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
    .setTitle(`☑️ Você entrou em um novo emprego!`)
    .setColor("a5d7ff")
    .setDescription(`**Certo!** Você pegou um novo emprego.`)
], components: []})
  
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

    if(select == 'lixeiro'){
        
      interaction.editReply({embeds: [msgembed("🗑️", "lixeiro", "45m", 1)], components: [row, button("lixeiro")]})
      
    }
    
        if(select == 'pizza'){

      interaction.editReply({embeds: [msgembed("🍕", "entregador de pizza", "1h", 1.5)], components: [row, button("pizza")]})
    }
    
    if(select == 'frentista'){
      
      interaction.editReply({embeds: [msgembed("⛽", "frentista", "3h", 2.5)], components: [row, button("frentista")]})
   
    }
    
    if(select == 'caminhao'){
        
      interaction.editReply({embeds: [msgembed("🚛", "caminhoneiro", "5h", 3.5)], components: [row, button("cominhao")]})
   
    }
    
    if(select == 'sedex'){
        
      interaction.editReply({embeds: [msgembed("📦", "entregador de sedex", "7h", 6)], components: [row, button("sedex")]})
    }
    
    if(select == 'peixe'){
        
      interaction.editReply({embeds: [msgembed("🎣", "pescador", "9h", 8.5)], components: [row, button("pescador")]})
      
    }
    
    if(select == 'ti'){
        
      interaction.editReply({embeds: [msgembed("💻", "chefe de ti", "10h", 10)], components: [row, button("ti")]})
      
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
        emoji: '💫',
        value: 'atm',
      },
      {
          label: 'Empregos',
          emoji: '💤',
          value: 'empregos',
      },
      {
        label: 'Trabalhar',
        emoji: '🌐',
        value: 'trabalhar',
    },
      {
        label: 'Daily',
        emoji: '🎁',
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
      .setDescription(`Shiki: Muita calma hessa hora você não solicitou o comando`)
  ], ephemeral: true})
  
     i.deferUpdate()
  
   if(i.values[0] == "atm"){
    const user = interaction.user
    async function botparse(user) {
       if(user === true){
           interaction.reply("Bot Não Possui Atm")
       } else {
           const user = interaction.options.getUser("user") || interaction.user
           const userdb = await client.userdb.findOne({
               userID: user.id
           }) || { economia: { banco: 0, money: 0}}
            
           interaction.editReply({embeds: [new Discord.MessageEmbed()
           .setTitle(`${user.username}`)
           .setColor("a5d7ff")
           .setDescription(`> 💸 Dinheiro: ${userdb.economia.money}
      > 🏦 Dinheiro no banco: ${userdb.economia.banco}
      > 💱 Dinheiro total: ${userdb.economia.money + userdb.economia.banco}`)
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
   .setTitle('🤑 Escolha o melhor trabalho pra você!')
   .setColor("a5d7ff")
   .setDescription('Selecione um emprego para ver informações e pega-lo\nCada Emprego tem um cooldown e quantia de dinheiro ganha diferentes, quanto maior o dinheiro ganho, mais tempo de cooldown vai existir.')
  
  const row = new Discord.MessageActionRow()
  .addComponents(
  new Discord.MessageSelectMenu()
   .setCustomId('menu')
  .setPlaceholder('selecione algum emprego')
  .addOptions([
   {
     label: 'lixeiro',
           emoji: '🗑️',
     value: 'lixeiro',
   },
   {
       label: 'entregador de pizza',
           emoji: '🍕',
       value: 'pizza',
   },
   {
     label: 'frentista',
           emoji: '⛽',
     value: 'frentista',
   },
   {
     label: 'caminheiro',
           emoji: '🚛',
     value: 'caminhao',
   },
   {
     label: 'sedex',
           emoji: '📦',
     value: 'sedex',
   },
    {
     label: 'pescador',
           emoji: '🎣',
     value: 'peixe',
   },
   {
     label: 'TI',
           emoji: '💻',
     value: 'ti',
   }
  ]),
     );
  
  interaction.editReply({embeds: [embed], components: [row], fetchReply: true}).then(msg => {
  
  const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });
  
  collector.on('collect', async i => {
  
  if(i.user.id != interaction.user.id) return i.followUp({embeds: [new Discord.MessageEmbed()
   .setTitle(`👨 Calma ae...`)
   .setColor("a5d7ff")
   .setDescription(`Só quem solicitou o menu pode usá-lo.`)
  ], ephemeral: true})
  
  i.deferUpdate()
  
  if(i.componentType == 'BUTTON') {
  
  if(Date.now() < userdb.cooldowns.trabalho){ 
   const calc = userdb.cooldowns.trabalho - Date.now()
   return interaction.followUp({embeds: [new Discord.MessageEmbed()
   .setTitle(`😶 Calma...`)
   .setColor("a5d7ff")
   .setDescription(`**Espera ae!** Você só pode trocar de emprego 1 vez por semana.
  > *Ainda falta **__${ms(calc).days}d ${ms(calc).hours}h ${ms(calc).minutes}m__** para você poder trocar novamente.*`)
  ], ephemeral: true})
  }
  const button = i.customId.split("_")[1]
  
  if(button == userdb.economia.trabalho .trampo) return interaction.followUp({embeds: [new Discord.MessageEmbed()
   .setTitle(`✋ Dá não filhão...`)
   .setColor("a5d7ff")
   .setDescription(`**Calma!** Você já está com este emprego.`)
  ], ephemeral: true})
  
  let trabalho,
     cooldown,
     maxmoney;
  
  switch (button) {
     
  case "lixeiro":
   trabalho = "lixeiro"
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
  
   if(select == 'lixeiro'){
       
     interaction.editReply({embeds: [msgembed("🗑️", "lixeiro", "45m", 1)], components: [row, button("lixeiro")]})
     
   }
   
       if(select == 'pizza'){
  
     interaction.editReply({embeds: [msgembed("🍕", "entregador de pizza", "1h", 1.5)], components: [row, button("pizza")]})
   }
   
   if(select == 'frentista'){
     
     interaction.editReply({embeds: [msgembed("⛽", "frentista", "3h", 2.5)], components: [row, button("frentista")]})
  
   }
   
   if(select == 'caminhao'){
       
     interaction.editReply({embeds: [msgembed("🚛", "caminhoneiro", "5h", 3.5)], components: [row, button("cominhao")]})
  
   }
   
   if(select == 'sedex'){
       
     interaction.editReply({embeds: [msgembed("📦", "entregador de sedex", "7h", 6)], components: [row, button("sedex")]})
   }
   
   if(select == 'peixe'){
       
     interaction.editReply({embeds: [msgembed("🎣", "pescador", "9h", 8.5)], components: [row, button("pescador")]})
     
   }
   
   if(select == 'ti'){
       
     interaction.editReply({embeds: [msgembed("💻", "chefe de ti", "10h", 10)], components: [row, button("ti")]})
     
   }
   
  }//if menus
  
  })//collector
  
  })//.then
  
  
  function msgembed(emoji, emprego, cooldown, ganhos){
    return new Discord.MessageEmbed()
    .setTitle(`${emoji} Emprego de ${emprego}.`)
    .setColor("a5d7ff")
    .setDescription(`🕑 Cooldown no comando de work: ${cooldown} \n💸 Ganhos máximo: ${ganhos}k`)
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
   .setDescription(`Ainda falta ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s para você pegar o Pagamento novamente.`)
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
   .setTitle(`💸 seu pagamento diario foi recebido`)
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
       .setTitle('🌐 Administração')
       .setThumbnail(client.user.avatarURL())
       .setColor("#7e008f")
       .addFields(
       { name: '__setwelcome__', value: 'Configurar welcome' },
       { name: '__emoji__', value: 'Pega Informaçao Do emoji' },
         )
                 ]})
     }
    if(i.values[0] == "trabalhar"){
      let userdb = await client.userdb.findOne({
        userID: interaction.user.id
    })
     
    if(!userdb || !userdb.economia.trabalho.trampo){
        return interaction.editReply({embeds: [new Discord.MessageEmbed()
   .setTitle(`✋ Dá não filhão...`)
   .setColor("a5d7ff")
   .setDescription(`**Calma!** Você ainda não tem um emprego, digite /empregos para ver a lista de empregos e escolher algum.`)
  ], ephemeral: true})
    }
     
   if(Date.now() < userdb.cooldowns.work){
     const calc = userdb.cooldowns.work - Date.now()
     
        return interaction.editReply({embeds: [new Discord.MessageEmbed()
   .setTitle(`🤔 Calma ae amigo...`)
   .setColor("a5d7ff")
   .setDescription(`Ainda falta ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s para você trabalhar novamente.`)
  ], ephemeral: true})
    }  
     
   let frase,
       emprego;
         
   switch (userdb.economia.trabalho .trampo){
     
  case "lixeiro":
   emprego = "🗑️ lixeiro"
   frase = ["juntou 20 sacos lixos", "dirigiu o caminhão de lixo por 2 horas"]
  break;
  
  case "pizza":
   emprego = "🍕 entregador de pizza"
   frase = ["entregou 8 pizzas", "trabalhou por 3 horas"]
  break;
  
  case "frentista":
   emprego = "⛽ frentista"
   frase = ["abasteceu 28 carros", "trocou o óleo de 8 caminhões"]
  break;
  
  case "caminhoneiro":
   emprego = "🚛 caminhoneiro"
   frase = ["uma carga de Rondônia levou até Porto velho", "fez 2 entregas em 1 dia"]
  break;
  
  case "sedex":
   emprego = "📦 entregador do sedex"
   frase = ["entegou 20 pacotes"]
  break;
  
  case "pescador":
   emprego = "🎣 pescador"
   frase = ["pescou 20 bagres", "pescou um peixe lendário no laguinho do seu Zé"]
  break;
  
  case "ti":
   emprego = "💻 técnico de ti"
   frase = ["arrumou 7 computadores de pessoas que clicaram em mães solteias", "desenvolveu um software para poder abrir links porno na sua empresa."]
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
   .setTitle(`💸 Trabalho feito! `)
   .setColor("a5d7ff")
   .setDescription(`**Ta na mão chefia!** Você ${frase} como ${emprego} e ganhou 🤑 ${dinheiro} dinheiros.`)
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
       { name: 'Shikimori ', value: 'Apelido: Mi-Chan\nMiccon Shikimori é a personagem principal. Ela é filha de Miyabi Shikimori e namorada de Yuu Izumi.\nShikimori é uma pessoa muito confiante, carinhosa e gentil. Ela também é uma pessoa muito competitiva. Geralmente, ela é muito fofa, mas de vez em quando seu lado legal mostra que é intimidante e incrível ao mesmo tempo. Além disso, ela ama muito Yuu Izumi e sempre cuida dele literalmente protegendo-o de todas as situações ruins que ele entra devido à sua má sorte. Ela não gosta de doces, mas quando Izumi oferece smores em um acampamento, ela os come e diz a ele que gostaria de comer isso todos os dias.' }
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
    .setDescription(`🕑 Cooldown no comando de work: ${cooldown} \n💸 Ganhos máximo: ${ganhos}k`)
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
