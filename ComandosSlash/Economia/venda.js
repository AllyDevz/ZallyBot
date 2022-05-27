const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "vender",
    description: "Veja os itens disponíveis para comprar no shopping.",
    type: "CHAT_INPUT",

    run: async (client, interaction, args) => {
        try {
        let user = interaction.user;

        let embed = new Discord.MessageEmbed()
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setTitle("Vender 🛒")
            .setColor("RANDOM")
            .setDescription(`Olá ${interaction.user}, veja abaixo os itens disponíveis para vender no ShikiVenda:\n

> <:ilulu_17:979775758874583142> **Ilulu**
\`Valor de venda: 22.000$\`

> <:faf:979807135993053286> **Fafnir**
\`Valor de venda: 55.000$\`
`);

        let ops = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId("shopping")
                    .setPlaceholder(`💲 Clique aqui para comprar algum item.`)
                    .addOptions([
                        {
                            label: 'Ilulu',
                            description: 'Clique aqui para vender uma Ilulu',
                            emoji: '👩',
                            value: 'Ilulu',
                        }
                        ,
                        {
                            label: 'Fafnir',
                            description: 'Clique aqui para vender um Fanfnir',
                            emoji: '👩',
                            value: 'fafnir',
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
                }) || { economia: { banco: 0, money: 0, ilulu: 0, fafnir: 0}}
                let carteira = userdb.economia.money
                let waifu = userdb.economia.waifu
                let ilulu = userdb.economia.ilulu
                let fafnir = userdb.economia.fafnir
                let valor = c.values[0]
                //c.deferUpdate()

                if (valor === "comida") {

                    if (carteira < 1000) {
                        await c.reply(`${interaction.user} Você não possui \`1000 moedas\` para comprar comida.`)
                    } else {

                        await c.reply(`${interaction.user} Você comprou 1 comida por 1000 moedas!\nVeja seu inventário com \`/inventário\`.`);
                        db.add(`comida_${interaction.user.id}`, 1);
                        db.subtract(`carteira_${user.id}`, 1000)

                    }

                } else if (valor === "fafnir") {

                    if (ilulu < 1) {
                        c.channel.send(`${interaction.user} Você não possui 1 ilulu para vender`)
                    } else {

                        await  c.channel.send(`${interaction.user} Você vendeu um Fafnir por $55k Ilulus! \nVeja seu inventário com \`/inventário\`. \nVeja seus Shikicoin com \`/atm\`.`);
                        await client.userdb.updateOne({
                            userID: interaction.user.id
                        }, { $set: {
                            "economia.money": userdb.economia.money + 55000,
                            "economia.fafnir": userdb.economia.fafnir - 1
                        }
                        })
                    }
                } else if (valor === "Ilulu") {

                    if (ilulu < 1) {
                        await c.channel.send(`${interaction.user} Você não possui \`5 Waifus\` para comprar uma Ilulu`)
                    } else {

                        await c.channel.send(`${interaction.user} Você vendeu uma Ilulu por $22k Shikicoins \nVeja seu inventário com \`/inventário\`. \nVeja seus Shikicoin com \`/atm\`.`);
                        await client.userdb.updateOne({
                            userID: interaction.user.id
                        }, { $set: {
                            "economia.money": userdb.economia.money + 22000,
                            "economia.ilulu": userdb.economia.ilulu - 1
                        }
                        })

                    }
                } else if (valor === "waifu") {

                    if (carteira < 6500) {
                        await c.channel.send(`${interaction.user} Você não possui \`6500 moedas\` para comprar uma Waifu`)
                    } else {
                        await client.userdb.updateOne({
                            userID: interaction.user.id
                        }, { $set: {
                            "economia.money": userdb.economia.money - 6500,
                            "economia.waifu": userdb.economia.waifu + 1
                        }
                        })
                        await c.channel.send(`${interaction.user} Você comprou 1 Waifu por 6500 moedas!\nVeja seu inventário com \`/inventário\`.`);


                    } 

                }
                
            })

        })

    } catch(err) {
        // handle errors
        console.log(err)
      }
    }
}