const Discord = require("discord.js");

module.exports = {
    name: "emoji",
    description: "emoji parsed",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "id",
         description: "id",
         type: "STRING",
         required: true
        },
        ],
    run: async (client, interaction) => {
        
     let id = interaction.options.getString("id")
    var str = `${id}`
    const matches = str.match(/\d+/g);
    let emoji = client.emojis.cache.find(emoji => `<:${emoji.name}:${emoji.id}>` === matches[0]) || client.emojis.cache.find(emoji => emoji.name === matches[0]) || client.emojis.cache.get(matches[0]);

            try {

            if (!emoji.animated) {

                let img = `https://cdn.discordapp.com/emojis/${emoji.id}.png?size=2048`;
                let botao = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setStyle("LINK")
                            .setLabel("Faça o download")
                            .setEmoji("📎")
                            .setURL(img)
                    );

                    let embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Informações do Emoji:")
                    .setThumbnail(`${img}`)
                    .addFields(
                        {
                            name: `> \📝 Nome do emoji:`,
                            value: `\`${emoji.name}\``,
                            inline: false
                        },
                        {
                            name: `> \🆔 ID do emoji:`,
                            value: `\`${emoji.id}\``,
                            inline: false
                        },
                        {
                            name: `> \🧿 Menção do emoji:`,
                            value: `\`${emoji}\``,
                            inline: false
                        },
                        {
                            name: `> \🖼 O emoji é:`,
                            value: `\`Imagem (png/jpg)\``,
                            inline: false
                        }
                    );

                    interaction.reply({ embeds: [embed], components: [botao] })
            } 

            else if (emoji.animated) {

                    let img = `https://cdn.discordapp.com/emojis/${emoji.id}.gif?size=2048`;
                    let botao = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                                .setStyle("LINK")
                                .setLabel("Faça o download")
                                .setEmoji("📎")
                                .setURL(`${img}`)
                        );
    
                        let embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Informações do Emoji:")
                        .setThumbnail(img)
                        .addFields(
                            {
                                name: `> \📝 Nome do emoji:`,
                                value: `\`${emoji.name}\``,
                                inline: false
                            },
                            {
                                name: `> \🆔 ID do emoji:`,
                                value: `\`${emoji.id}\``,
                                inline: false
                            },
                            {
                                name: `> \🧿 Menção do emoji:`,
                                value: `\`${emoji}\``,
                                inline: false
                            },
                            {
                                name: `> \🖼 O emoji é:`,
                                value: `\`Gif\``,
                                inline: false
                            }
                        );

                        interaction.reply({ embeds: [embed], components: [botao] })

            }

        } catch (e) { 
            interaction.reply(`Ops! Não consegui identificar o emoji.`)
        }

        }

    }
