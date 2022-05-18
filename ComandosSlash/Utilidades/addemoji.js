const Discord = require("discord.js")
const { Util } = require('discord.js');
const { parse } = require("twemoji-parser");

module.exports =  {
    name: "addemoji",
    description: "[:heavy_plus_sign:] Adicione um emoji no seu servidor",
    type: "CHAT_INPUT",
    options: [
        {
            name: "emoji",
            type: "STRING",
            description: "Emoji que vc deseja adicionar",
            required: true
            
        },
        {

        name: "nome",
        type: "STRING",
        description: "Nome do Emoji que vc deseja adicionar",
        required: true

        }   
    ],
    
    run: async (client, interaction, args) => {

        if(!interaction.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) return interaction.reply(`
        :SystemMessageCross: ${interaction.user} **|** Você não possui permissão para utilizar esse comando. \n\n>>> *Para utilizar esse comando você precisa da permissão* **Gerenciar emojis**.`);

        const emoji = interaction.options.getString("emoji")

        let emj = Util.parseEmoji(emoji)

        

        if(emj.id) {
            const link = `https://cdn.discordapp.com/emojis/${emj.id}.${emj.animated ? "gif" : "png"}`;
            const name = interaction.options.getString("nome")
                interaction.guild.emojis.create(
                `${link}`,
                `${name || `${emj.name}`}`
            ).catch(() => {
                return interaction.reply(`:SystemMessageCross: **|** Parece que este servidor atingiu o limite máximo de emojis.`);
            })
            interaction.reply(`${emj.animated ? `<a:${name}:${emj.id}>` : `<:${name}:${emj.id}>`} **|** Emoji adicionado com sucesso!`)
        } else {
            let CheckEmoji = parse(emoji, {assetType:"png"});
            if(!CheckEmoji[0])
            return interaction.reply(`:SystemMessageCross: **|** O emoji que você enviou é invalido.`)
        }
        }
}