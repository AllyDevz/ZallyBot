const Discord = require("discord.js")
const moment = require('moment')
moment.locale('pt-BR')

module.exports = {
    name: 'serverinfo',
    description: "「🤔 informaçãoVeja as informaçãoes do servidor」",

    run: async(client, interaction, args) => {
        const user = interaction
        const userdb = await client.userdb.findOne({
            userID: user.id
        }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
        
        let server = interaction.guild;

        function nivel() {
            let quantia = server.premiumSubscriptionCount
            if (quantia < 2) {
                return 'Nível 1'
            } else if (quantia > 2 && quantia < 6) {
                return 'Nível 2'
            } else {
                return 'Nível 3'
            }
        }

    const retorno = new Discord.MessageEmbed()
    .setColor(userdb.economia.color)
    .setTitle(server.name)
    .setThumbnail(server.iconURL({ dynamic: true}))
    .addField('**Nickname:**', `__${interaction.member.user.tag}__`, true)
    .addField('**Data de entrada no servidor:**', `\`${moment(server.joinedAt).format('LLL')}\`\n**(${moment(server.joinedAt).fromNow()})**`, false)
    .addField('**Criado em:**', `\`${moment(server.createdAt).format('LLL')}\`\n**(${moment(server.createdAt).startOf('day').fromNow()})**`, false)
    .addField('**ID do servidor:**', `\`${server.id}\``, true)
    .addField('**Boost:**', `\`${server.premiumSubscriptionCount} Impulsos\`\n**(${nivel()})**`, true)
    .addField('**Quantidade de membros:**', `\`${server.memberCount} Membros\``, true)
    .setFooter({ text: 'Cabaré da Zally', iconURL: interaction.member.displayAvatarURL({ dynamic: true, size: 1024 }) })
    .setTimestamp(new Date())

    interaction.reply({embeds: [retorno]})
  },
};