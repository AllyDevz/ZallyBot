const Discord = require("discord.js");

module.exports = {
    name: "utilidades",
    description: "retirar seu dinheiro no banco",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'avatar',
            description: '[👥 Utilidades] Veja o avatar de um usuário',
            type: ApplicationCommandOptionType.Subcommand,
            options: [{
                name: 'user',
                description: 'Selecione um usuário, ou envie um ID',
                type: ApplicationCommandOptionType.User,
                required: false
            }]
        },
        ],
    run: async (client, interaction) => {
        
        switch (interaction.options.getSubcommand()) {
            case 'avatar': {
                let userAvatar = interaction.options.getUser('user') || interaction.user;
                let AvatarUser = userAvatar.displayAvatarURL({ size: 4096, dynamic: true, format: "png" })

                let EmbedAvatar = new EmbedBuilder()
                    .setColor('#2f3136')
                    .setTitle(`🖼 ${userAvatar.username}`)
                    .setFooter({ text: 'Apesar de tudo, ainda é você.'})
                    .setImage(AvatarUser);

                let ButtonAvatar = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Abrir imagem no navegador')
                    .setURL(AvatarUser)
                );

                interaction.reply({ embeds: [EmbedAvatar] });

                break;



            }




        }

    }
};
function abreviar(number, precision=2) {
    return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
  }