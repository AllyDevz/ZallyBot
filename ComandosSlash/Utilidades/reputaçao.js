const Discord = require("discord.js");

module.exports = {
    name: "rep",
    description: "「🤑 Economia」Dar reputação para um usuário.",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "user",
         description: "Usuário que você quer dar reputação.",
         type: "USER",
         required: true
        },
    ],

    run: async (client, interaction, args) => {
     
        const user = interaction.options.getUser("user")
        
        if(user.id == interaction.user.id){
            return interaction.reply({embeds: [new Discord.MessageEmbed()
           .setColor("RANDOM")
           .setDescription("Você não pode dar reputacao para si mesmo, bobinho.")
           .setFooter({ text: `${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true, size: 1024 }) })
           .setTimestamp(new Date())
       ], ephemeral: true})
        }
    
         let userdb = await client.userdb.findOne({
             userID: interaction.user.id
         })
              
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
      
         if(Date.now() < userdb.cooldowns.reputacao){
            const calc = userdb.cooldowns.reputacao - Date.now()
            
               return interaction.reply({embeds: [new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`Ainda falta **${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s** para você dar uma reputação novamente.`)
          .setFooter({ text: `${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true, size: 1024 }) })
          .setTimestamp(new Date())
      ], ephemeral: true})
           }  
      
      const dinheiro = 1;

     await client.userdb.updateOne({
         userID: user.id
     }, { $set: {
         "economia.rep": userdb2.economia.rep + dinheiro
     }
     })
     
     await client.userdb.updateOne({
        userID: interaction.user.id
    }, { $set: {
        "cooldowns.reputacao": Date.now() + 7200000
    }
    })

    interaction.reply({embeds: [new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(` Você deu uma reputacao para ${user}.`)
    .setFooter({ text: `${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true, size: 1024 }) })
    .setTimestamp(new Date())
]})
    }
};

function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}
