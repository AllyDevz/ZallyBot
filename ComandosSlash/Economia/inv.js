const Discord = require("discord.js")
const db = require("quick.db")

module.exports =  {
    name: "inventário",
    description: "Veja seu inventário.",
    type: "CHAT_INPUT",
    options: [
        {
            name: "usuário",
            type: "USER",
            description: "Mencione um usuário para ver o inventário.",
            required: false
            
        }
    
    ],
    
    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("usuário");
        if (!user) user = interaction.user;
        const userdb = await client.userdb.findOne({
            userID: user.id
        }) || { economia: { banco: 0, money: 0}}
        let carteira = userdb.economia.money
        let waifu = userdb.economia.waifu
        let ilulu = userdb.economia.ilulu


        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`Olá ${interaction.user}, veja o inventário de \`${user.username}\` abaixo:\n
> Carteira: \`${carteira} Moedas\`.`)
        .addFields(
            {
                name: `Waifus:`,
                value: `\`${waifu}\``,
                inline: false
            },
            {
                name: `Ilulu:`,
                value: `\`${ilulu}\``,
                inline: true
            }
            
        );

        interaction.reply({ embeds: [embed] })


        

    }
}