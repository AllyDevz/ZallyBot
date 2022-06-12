const Discord = require("discord.js");

module.exports = {
    name: "banir",
    description: "「🛠 Moderacão」Dê um banimento em algum membro do servidor",
    type: 1,
    options: [
        {
            name: "membro",
            type: 6,
            description: "Seleciona o membro que deseja banir.",
            required: true

        },
        {
            name: "motivo",
            type: 3,
            description: "Seleciona o motivo do banimento desse usuario.",
            required: true

        },
    ],

    run: async (client, interaction) => {

     const usuario = interaction.options.getUser("membro");
     const motivo = interaction.options.getString("motivo"); 


        if (!interaction.member.permissions.has("BAN_MEMBERS")) {
            return interaction.reply(`${interaction.user} **Voce não possui permissão para esse comando.**`);

        } else if (!interaction.guild.me.permissions.has("BAN_MEMBERS")) {
            return interaction.reply(`${interaction.user} **Eu não tenho permissões de Banir Membros.**`);

        } else {

            if (!usuario) {
                return interaction.reply({ content: `<:errado:967753596085084170> **| Esse usuario não está no servidor**` })
            } else {

/////////////// PARTE DB ///////////////

 let userdb = await client.userdb.findOne({
    userID: interaction.user.id
})
 
if(!userdb) userdb = await new client.userdb({ userID: interaction.user.id }).save();

 await client.userdb.updateOne({
    userID: interaction.user.id
}, { $set: {
    "banimentos": userdb.banimentos + 1,
}})

     let banidos = await client.userdb.findOne({
         userID: interaction.user.id
     }) || { banimentos: 0}

     const { banimentos } = banidos;

/////////////// RETORNO ///////////////

    let punição = new Discord.MessageEmbed()
                    .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
                    .setFooter({ text: `${interaction.user.username} Já baniu ${banimentos} usuários`, iconURL: interaction.user.displayAvatarURL({format: "png"})})
                    .setColor("RED")
                    .setDescription(`**<a:warning:973558469170958346>  Sistema de Punições - ${interaction.client.user.username}**`)
                    .addFields(
                        {
                            name: `<:blurplemembers:973612345924411432> | Usuário banido:`,
                            value: `⠀<:3199blurplejoin:973612495199674389> **Tag:** \`${usuario.tag}\`\n⠀<:3199blurplejoin:973612495199674389> **ID:** \`${usuario.id}\``,
                            inline: false
                        },
                        {
                            name: `<:blurplecertifiedmoderator:973545857343422524> | Author do banimento:`,
                            value: `⠀<:3199blurplejoin:973612495199674389> **Tag:** \`${interaction.user.tag}\`\n⠀<:3199blurplejoin:973612495199674389> **ID:** \`${interaction.user.id}\``,
                            inline: false
                        },
                        {
                            name: `<:1520blurplesettings:973613378255863869> | Motivo:`,
                            value: `⠀⠀${motivo}`,
                            inline: false
                        },
                    );

                try {
                    interaction.guild.members.ban(usuario, { days: 7, reason: motivo });
                    interaction.reply({ embeds: [punição] }).then(() => {
                        setTimeout(() => {
                            interaction.deleteReply()
                        }, 10000)
                    })
                } catch (e) {
                    console.error(e)
                }
            }
        }
    },
};