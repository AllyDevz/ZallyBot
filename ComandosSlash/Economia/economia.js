const { EmbedBuilder, ApplicationCommand, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const axios = require('axios');

module.exports = {
    name: 'usuariot',
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

    ],
    run: async(client, interaction) => {
        switch (interaction.options.getSubcommand()) {
            case 'info': {

                interaction.reply("hi")

                break;
            }
            case 'avatar': {
                const usuario = interaction.options.getUser('user')
                const userId = interaction.member.user.id;
              
                const user = client.users.cache.find(user => user.id === userId)
        
                function getUserFromMention(usuario) {
                    if (!usuario){
                      return user
                    }
            
                    if (usuario.toString().startsWith('<@') && usuario.toString().endsWith('>')) {
                      usuario = usuario.toString().slice(2, -1);
            
                      if (usuario.toString().startsWith('!')) {
                        usuario = usuario.toString().slice(1);
                      }
            
                      return client.users.cache.get(usuario);
                    }
                  }
            
            
                  const p = getUserFromMention(usuario)
                  const userdb = await client.userdb.findOne({
                    userID: p.id
                }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"#5234eb"}}
                
                const embed = new MessageEmbed()
                    .setTitle(`${p.username}'s Avatar`)
                    .setColor(userdb.economia.color)
                    .setImage(p.displayAvatarURL({
                        dynamic: true,
                        size: 1024
                    }))
                    .setDescription(`[Png](${p.avatarURL({ format: 'png' })}) | [Webp](${p.avatarURL({ dynamic: true })}) | [Jpg](${p.avatarURL({ format: 'jpg' })})`)
                    .setFooter(`Requested by: ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }));
                    const row = new Discord.MessageActionRow()
                    .addComponents(
                    new Discord.MessageSelectMenu()
                      .setCustomId('menu')
                    .setPlaceholder('selecione uma categoria de comandos.')
                    .addOptions([
                      {
                        label: '[👑]Full HD',
                        description: "1080p",
                        value: '1080p',
                      },
                      {
                          label: '[🎪]HD',
                          description: "720p",
                          value: '720p',
                      },
                      {
                        label: '[🎞]SD',
                        description: "480p",
                        value: '480p',
                    },
                    ,
                      {
                        label: '[🎯]SD',
                        description: "120p",
                        value: '120p',
                    },
                    ]),
                        );
                  
                        interaction.reply({embeds: [embed], components: [row], fetchReply: true}).then(msg => {
        
                          const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });
                        
                        collector.on('collect', async i => {
                        
                          if(i.user.id != interaction.user.id) return i.reply({embeds: [new Discord.MessageEmbed()
                            .setColor("a5d7ff")
                            .setDescription(`Só quem solicitou o menu pode usá-lo.`)
                        ], ephemeral: true})
                        
                           i.deferUpdate()
                        
                           if(i.values[0] == "1080p"){
                            interaction.editReply({embeds: [new Discord.MessageEmbed()
                              .setTitle(`${p.username}'s Avatar`)
                              .setDescription("[👑]Full HD")
                              .setColor(userdb.economia.color)
                              .setImage(p.displayAvatarURL({
                                  dynamic: true,
                              }) + "?size=4096")
                              .setDescription(`[Png](${p.avatarURL({ format: 'png', size: 2048 })}) | [Webp](${p.avatarURL({ dynamic: true , size: 2048 })}) | [Jpg](${p.avatarURL({ format: 'jpg', size: 2048 })})`)
                              .setFooter(`Requested by: ${interaction.user.username}`, interaction.user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }))
                                       ]})
        
                           }
                           if(i.values[0] == "720p"){
                            interaction.editReply({embeds: [new Discord.MessageEmbed()
                              .setTitle(`${p.username}'s Avatar`)
                              .setDescription("[🎪]HD")
                              .setColor(userdb.economia.color)
                              .setImage(p.displayAvatarURL({
                                  dynamic: true,
                              })+ "?size=1024")
                              .setDescription(`[Png](${p.avatarURL({ format: 'png' })}) | [Webp](${p.avatarURL({ dynamic: true, size: 1024 })}) | [Jpg](${p.avatarURL({ format: 'jpg', size: 1024 })})`)
                              .setFooter(`Requested by: ${interaction.user.username}`, interaction.user.displayAvatarURL({ format: 'png', size: 1024, dynamic: true }))
                                       ]})
        
                           }
                           if(i.values[0] == "120p"){
                            interaction.editReply({embeds: [new Discord.MessageEmbed()
                              .setTitle(`${p.username}'s Avatar`)
                              .setDescription("[🎞]SD")
                              .setColor(userdb.economia.color)
                              .setImage(p.displayAvatarURL({
                                  dynamic: true,
        
                              })+ "?size=100")
                              .setDescription(`[Png](${p.avatarURL({ format: 'png' })}) | [Webp](${p.avatarURL({ dynamic: true, size: 100 })}) | [Jpg](${p.avatarURL({ format: 'jpg', size: 100 })})`)
                              .setFooter(`Requested by: ${interaction.user.username}`, interaction.user.displayAvatarURL({ format: 'png', size: 100, dynamic: true }))
                                       ]})
        
                           }             
                        })//collector
                          
                        })//.thens

            }

            
            }
        }

    }
