const Discord = require("discord.js");

module.exports = {
    name: "utilidades",
    description: "retirar seu dinheiro no banco",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'avatar',
            description: '[👥 Utilidades] Veja o avatar de um usuário',
            type: "SUB_COMMAND",
            options: [{
                name: 'user',
                description: 'Selecione um usuário, ou envie um ID',
                type: 'USER',
                required: false
            }]
        },
        {
            name: "serverinfo",
            description: "ver as informaçoes do servidor",
            type: "SUB_COMMAND",
        }
        ],
    run: async (client, interaction) => {
        
        switch (interaction.options.getSubcommand()) {
            case 'avatar': {
                
                let userAvatar = interaction.options.getUser('user') || interaction.user;
                let AvatarUser = userAvatar.displayAvatarURL({ size: 4096, dynamic: true, format: "png" })
                const userdb = await client.userdb.findOne({
                    userID: userAvatar.id
                }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"#5234eb"}}
                
                let EmbedAvatar = new Discord.MessageEmbed()
                    .setColor(userdb.economia.color)
                    .setTitle(`🖼 ${userAvatar.username}`)
                    .setFooter({ text: `${userAvatar.tag}`})
                    .setImage(AvatarUser);

                interaction.reply({ embeds: [EmbedAvatar] });

                break;



            }
          case "serverinfo": {
            const userdb = await client.userdb.findOne({
                userID: interaction.user.id
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
          }



        }

    }
};
function abreviar(number, precision=2) {
    return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
  }