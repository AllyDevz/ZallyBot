const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "shop",
    description: "Veja os itens disponíveis para comprar no shopping.",
    type: "CHAT_INPUT",

    run: async (client, interaction, args) => {

        let user = interaction.user;

        let embed = new Discord.MessageEmbed()
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setTitle("Shopping 🛒")
            .setColor("RANDOM")
            .setDescription(`Olá ${interaction.user}, veja abaixo os intens disponíveis para compra no shopping:\n
> 👩‍💼 **Waifu**
\`6500 Shikicoins\`

> 👩 **Ilulu**
\`5 Waifus\`
`);

        let ops = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId("shopping")
                    .setPlaceholder(`💲 Clique aqui para comprar algum item.`)
                    .addOptions([
                        {
                            label: 'Waifu',
                            description: 'Clique aqui para comprar uma Waifu',
                            emoji: '👩‍💼',
                            value: 'aparelhodigital',
                        },
                        {
                            label: 'Ilulu',
                            description: 'Clique aqui para comprar uma Ilulu',
                            emoji: '👩',
                            value: 'Ilulu',
                        }
                    ])
            );

        interaction.reply({ embeds: [embed], components: [ops] }).then(() => {

            let filtro = msg => msg.user.id === interaction.user.id;
            let coletor = interaction.channel.createMessageComponentCollector({ filter: filtro, time: 180000 });

            coletor.on("collect", async(c) => {
                const user = interaction.options.getUser("user") || interaction.user
                const userdb = await client.userdb.findOne({
                    userID: user.id
                }) || { economia: { banco: 0, money: 0}}
                let carteira = userdb.economia.money
                let waifu = userdb.economia.waifu
                let valor = c.values[0]
                //c.deferUpdate()

                if (valor === "comida") {

                    if (carteira < 1000) {
                        c.reply(`${interaction.user} Você não possui \`1000 moedas\` para comprar comida.`)
                    } else {

                        c.reply(`${interaction.user} Você comprou 1 comida por 1000 moedas!\nVeja seu inventário com \`/inventário\`.`);
                        db.add(`comida_${interaction.user.id}`, 1);
                        db.subtract(`carteira_${user.id}`, 1000)

                    }

                } else if (valor === "roupa") {

                    if (carteira < 5000) {
                        c.reply(`${interaction.user} Você não possui \`5000 moedas\` para comprar roupa.`)
                    } else {

                        c.reply(`${interaction.user} Você comprou 1 roupa por 5000 moedas!\nVeja seu inventário com \`/inventário\`.`);
                        db.add(`roupa_${interaction.user.id}`, 1);
                        db.subtract(`carteira_${user.id}`, 5000)

                    }
                } else if (valor === "Ilulu") {

                    if (waifu < 5) {
                        c.reply(`${interaction.user} Você não possui \`5 Waifus\` para comprar uma Ilulu`)
                    } else {

                        c.reply(`${interaction.user} Você comprou uma Ilulu por 5 waifus \nVeja seu inventário com \`/inventário\`.`);
                        await client.userdb.updateOne({
                            userID: interaction.user.id
                        }, { $set: {
                            "economia.waifu": userdb.economia.money - 5,
                            "economia.aparelhodigital": userdb.economia.ilulu + 1
                        }
                        })

                    }
                } else if (valor === "aparelhodigital") {

                    if (carteira < 6500) {
                        c.reply(`${interaction.user} Você não possui \`6500 moedas\` para comprar uma Waifu`)
                    } else {
                        await client.userdb.updateOne({
                            userID: interaction.user.id
                        }, { $set: {
                            "economia.money": userdb.economia.money - 6500,
                            "economia.aparelhodigital": userdb.economia.waifu + 1
                        }
                        })
                        c.channel.send(`${interaction.user} Você comprou 1 Waifu por 6500 moedas!\nVeja seu inventário com \`/inventário\`.`);


                    } 

                }
                
            })

        })


    }
}