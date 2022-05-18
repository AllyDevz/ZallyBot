const Discord = require("discord.js");
const ms = require('ms')
module.exports = {
    name: "giveway",
    description: "alterar o Foto De Fundo do seu perfil",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'tempo',
            description: 'Selecione a duração do sorteio (1d, 1h ou 1m, D = Dia / H = Hora / M = Minuto.)',
            type: 3,
            required: true
        },
        {
            name: 'canal',
            description: 'Selecione o canal que deseja realizar o sorteio',
            type: 7,
            required: true
        },
        {
            name: 'premio',
            description: 'Escreva qual vai ser o premio do sorteio',
            type: 3,
            required: true
        }
    ],
    run: async (client, interaction) => {
        
        let duracao = interaction.options.getString('tempo');
        let canalsorteio = interaction.options.getChannel('canal');
        let premio = interaction.options.getString('premio');


        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({
            content: `<a:NegativoGIF:968786482074619914> **| ${interaction.user}, você não tem permissão para usar este comando!**`,ephemeral: true
        })
        if (canalsorteio.type !== 'GUILD_TEXT'){
            return interaction.reply({
                content: `<a:NegativoGIF:964931387549417522> **| ${interaction.user}, Selecione um canal de texto, não uma categoria/canal de voz!**`,ephemeral: true
            })
        }

        const erro1 = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setDescription(`${interaction.user} o tempo precisa de ter o seguinte formato: 1d, 1h ou 1m, D = Dia / H = Hora / M = Minuto.`)

        if (!duracao.endsWith("d") && !duracao.endsWith("h") && !duracao.endsWith("m")) {
            return interaction.reply({ embeds: [erro1],ephemeral: true })
        }
        // ${prémio}
        // 🎉
        // ${interaction.user}
        const start = new Discord.MessageEmbed()
        .setTitle("<a:giveaway_blob:966290887283978270> Novo Sorteio! <a:giveaway_blob:966290887283978270>")
        .setDescription(`Clique em 🎉 para participar\n
        **Sorteio criador por:**\n***${interaction.user}***\n
        **Esta Sorteando:**\n${premio}`)
        .setFooter({ text: 'O sorteio irá acabar', iconURL: ''})
        .setTimestamp(Date.now() + ms(duracao))
        .setColor('#A600FF')

        const finish = new Discord.MessageEmbed()
        .setTitle(`${premio}`)
        .setDescription(`Não há participantes suficientes para determinar um vencedor!\nIniciado por: **${interaction.user}**`)
        .setColor("BLACK")

        const m = await canalsorteio.send({ content: `@everyone`, embeds: [start] })
        m.react("🎉");

        setTimeout(() => {
            if (m.reactions.cache.get("🎉").count <= 1) {
                return canalsorteio.send({
                    content: `🎉   **GIVEAWAY TERMINADO**   🎉`, embeds: [finish]
                })
            }
        })
        
        const decisao = m.reactions.cache
        .get("🎉")
        .users.cache.filter((u) => !u.bot)
        .random();

        const vencedor = new Discord.MessageEmbed()
        .setDescription(`Parabéns ${decisao} você ganhou: ${premio}`)
        .setColor('#A600FF')
        canalsorteio.send({ content: `${decisao}`, embeds: [vencedor] });
        


        decisao.send({
            content: `<a:giveaway_blob:966290887283978270> Parabéns você ganhou o sorteio de ${premio}.`
        })

    }
};
