const Discord = require("discord.js");

module.exports = {
    name: "atm",
    description: "ver a sua atm ou a de alguém",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "user",
         description: "usuário que você quer ver a atm.",
         type: 6,
         required: false
        },
        ],
    run: async (client, interaction) => {
    
     const user = interaction.options.getUser("user") || interaction.user
     async function botparse(user) {
        if(user === true){
            interaction.reply("Bot Não Possui Atm")
        } else {
            const user = interaction.options.getUser("user") || interaction.user
            const userdb = await client.userdb.findOne({
                userID: user.id
            }) || { economia: { banco: 0, money: 0}, color:"36393e"}
            atmb = `
            
            
            ╭━═[🎫𝓐𝓽𝓶 𝓩𝓪𝓵𝓵𝔂🎫]═━━⪨
            
        🎱𝓔𝓶𝓹𝓻𝓮𝓰𝓸𝓼:${userdb.economia.trabalho.trampo} 
        💸 𝓭𝓲𝓷𝓱𝓮𝓲𝓻𝓸: ${(userdb.economia.money).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        🏦 𝓓𝓲𝓷𝓱𝓮𝓲𝓻𝓸 𝓷𝓸 𝓫𝓪𝓷𝓬𝓸 ${(userdb.economia.banco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        💱 𝓓𝓲𝓷𝓱𝓮𝓲𝓻𝓸 𝓽𝓸𝓽𝓪𝓵: ${(userdb.economia.money + userdb.economia.banco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              
            ╰━━━━━━━━━━━━━━━━━━━━━━⪨
`
            interaction.reply({embeds: [new Discord.MessageEmbed()
            .setTitle(`𝓷𝓸𝓶𝓮:${user.username}\n𝒶𝓅𝑒𝓁𝒾𝒹𝑜:${userdb.economia.usuario}`)
            .setColor(userdb.economia.color)
            .setDescription(`${atmb}`)
                 ]})  
        }
     }
    botparse(user.bot)
    console.log(user)


    }
};
