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

            interaction.reply({embeds: [new Discord.MessageEmbed()
                .setColor("#6400b6")
                .setTitle("Saldo na carteira Monetário")
                .setDescription(`**${user.username}**, veja as informações da sua carteira:` +
                `\nEmprego:**${userdb.economia.trabalho.trampo}**\n\nDinheiro: **${(userdb.economia.money).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}**` +
                `\nBanco: **${(userdb.economia.banco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}**`)
                .setFooter("Informações da sua carteira!")
                .setTimestamp()
            
                 ]})  
        }
     }
    botparse(user.bot)
    console.log(user)


    }
};
