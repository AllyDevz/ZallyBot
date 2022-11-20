const Discord = require('discord.js')
const server = require("../../Database/welcome")
module.exports = {
    name: 'setwelcome',
    description: 'Set the Welcome Channel.',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'channel',
            description: 'Channel where the message will be sent.',
            type: 'CHANNEL',
            required: true,
        },
        {
            name: 'image',
            description: 'Image of the Welcome Embed',
            type: 'STRING',
            required: false,
        },
        {
            name: 'description',
            description: 'Description of the Welcome Embed',
            type: 'STRING',
            required: false,
        },
        {
            name: 'title',
            description: 'Title of the Welcome Embed',
            type: 'STRING',
            required: false,
        },
        {
            name: 'footer',
            description: 'Footer of the Welcome Embed',
            type: 'STRING',
            required: false,
        },
        {
            name: 'color',
            description: 'Color of the Welcome Embed',
            type: 'STRING',
            required: false,
        }
    ],
    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has("MANAGE_GUILD")) {

            interaction.reply({
                embeds: [new Discord.MessageEmbed()
                    .setDescription(`> :x: | You need \`MANAGE_GUILD\` permission to use this command!`)
                    .setColor('RANDOM')
                ]
            })
        } else {
            let canal = interaction.options.getChannel(`channel`)
            let image = interaction.options.getString(`image`)
            let footer = interaction.options.getString(`footer`)
            let title = interaction.options.getString(`title`)
            let description = interaction.options.getString(`description`)
            let color = interaction.options.getString(`color`)


            let guildMongoDb = await server.findOne({
                serverId: interaction.guild.id
            })

            if (!guildMongoDb) {

                const novoserver = await new server({
                    serverId: interaction.guild.id
                })
                novoserver.save()
            } else {
                await server.findOneAndUpdate({
                    serverId: interaction.guild.id
                }, {
                    canal: canal.id,
                    image: image,
                    description: description,
                    title: title,
                    footer: footer,
                    color: color
                })
            }

            interaction.reply({
                embeds: [new Discord.MessageEmbed()
                    .setDescription(`✅ | Done! The Server Welcome Channel has been set to ${canal}`)
                    .setColor(`RANDOM`)]
            })
        }
    }
}