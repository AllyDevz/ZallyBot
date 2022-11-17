const Discord = require('discord.js')
module.exports = {
    name: 'clear',
    description: '「♻️ Limpe as mensagens de um chat.」',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'quantidade',
            description: 'Número de mensagens para serem apagadas.',
            type: 'NUMBER',
            required: true,
        }
    ],
    run: async (client, interaction, args) => {

        let numero = interaction.options.getNumber('quantidade')

        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else

        if (parseInt(numero) > 99 || parseInt(numero) <= 0) {
            return interaction.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setDescription(`> **Digite uma quantidade de** \`1 - 99\`**.**`)
                    .setColor('RANDOM')
                ], ephemeral: true
            })
        } else {

        interaction.channel.bulkDelete(parseInt(numero))

        let embed = new Discord.MessageEmbed()
            .setDescription(`> ♻️ Limpeza concluida`)
            .setTimestamp()
            .setFooter({ text: `Limpado por: ${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) }) //utilizar npm i discord.js@latest
            .setColor('RANDOM')

        interaction.reply({ embeds: [embed] }).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 5000)
        })

    }

    }
}