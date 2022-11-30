const { EmbedBuilder, ApplicationCommand, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const axios = require('axios');

module.exports = {
    name: 'user',
    description: 'subcommand de user',
    options: [
            {
                name: 'info',
                description: '[👥 Utilidades] Veja informações sobre um usuário',
                type: ApplicationCommandOptionType.Subcommand,
                options: [{
                    name: 'user',
                    description: 'Selecione um usuário, ou envie um ID',
                    type: ApplicationCommandOptionType.User,
                    required: false
                }],
            },
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
            {
                name: 'banner',
                description: '[👥 Utilidades] Veja o banner de um usuário',
                type: ApplicationCommandOptionType.Subcommand,
                options: [{
                    name: 'user',
                    description: 'Selecione um usuário, ou envie um ID',
                    type: ApplicationCommandOptionType.User,
                    required: false
                }]
            }
    ],
    run: async(client, interaction) => {
        switch (interaction.options.getSubcommand()) {
            case 'info': {
                let userInfo = interaction.options.getUser('user') || interaction.user;
                let InfoAvatar = userInfo.displayAvatarURL({ size: 4096, dynamic: true, format: "png" })
                let data = userInfo.createdAt.toLocaleDateString("pt-br");

                let embedInfo = new EmbedBuilder()
                    .setColor('#2f3136')
                    .setAuthor({ name: `${userInfo.username}`, iconURL: userInfo.displayAvatarURL({ dynamic: true }) })
                    .setThumbnail(InfoAvatar)
                    .setFields(
                        {
                            name: '<:Icon_ChannelText:1022780308145307670> Tag',
                            value: `\`${userInfo.tag}\``,
                            inline: true
                        },
                        {
                            name: '<:IconID:996654966867513406> ID',
                            value: `\`${userInfo.id}\``,
                            inline: true
                        },
                        {
                            name: '<:Date:1022780283512172614> Data de criação da conta',
                            value: `\`${data}\``,
                            inline: false
                        }
                    );

                    interaction.reply({ embeds: [embedInfo] });

                

                break;
            }
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
            case 'banner': {

                let userBanner = interaction.options.getUser('user') || interaction.user;

                axios
                    .get(`https://discord.com/api/users/${userBanner.id}`, {
                        headers: {
                            Authorization: `Bot ${client.token}`,
                        },
                    })
                    .then((res) => {
                        const { banner } = res.data;

                        if (banner) {
                            const extension = banner.startsWith("a_") ? '.gif?size=4096' : '.png?size=4096';
                            const url = `https://cdn.discordapp.com/banners/${userBanner.id}/${banner}${extension}`;

                            let embedBanner = new EmbedBuilder()
                            .setColor('Red')
                            .setTitle(`🖼 ${userBanner.username}`)
                            .setImage(url);

                            const buttonBanner = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setStyle(ButtonStyle.Link)
                                .setURL(url)
                                .setLabel('Abrir no navegador')
                            )

                            interaction.reply({ embeds: [embedBanner], components: [buttonBanner] })
                        } else { interaction.reply({ content: `<:CircleError:1022536388266168320> ‣ ${userBanner} não tem um banner no perfil! Talvez ele não tenha Discord Nitro... Ou talvez ele só teve muita preguiça de colocar um banner bonitinho.`, ephemeral: true }) }
                    })
            }
        }

    }
}