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
        ],
    run: async (client, interaction) => {
        
        switch (interaction.options.getSubcommand()) {
            case 'avatar': {
                let userAvatar = interaction.options.getUser('user') || interaction.user;
                let AvatarUser = userAvatar.displayAvatarURL({ size: 4096, dynamic: true, format: "png" })

                let EmbedAvatar = new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setTitle(`🖼 ${userAvatar.username}`)
                    .setFooter({ text: 'Apesar de tudo, ainda é você.'})
                    .setImage(AvatarUser);

                interaction.reply({ embeds: [EmbedAvatar] });

                break;



            }




        }

    }
};
function abreviar(number, precision=2) {
    return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
  }