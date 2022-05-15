const Discord = require("discord.js")
const {MessageEmbed} = require ("discord.js")
const moment = require("moment") // npm i moment
moment.locale('pt-BR')

module.exports = {
    name: 'userinfo',
    aliases: ["infouser", "ui", "iu"],

run: async(client, message, args) => {
    const usuário = message.mentions.members.first() || message.guild.members.cache.get(args[0]) // usuário mencionado ou ID

    if(!args[0]){ // autor da mensagem
        let t = message.member
        let m = message.author
        const dwBackTo = new Discord.MessageActionRow() // select menu de voltar
        .addComponents(
            new Discord.MessageSelectMenu()
            .setCustomId('back')
            .addOptions([
                {
                    label: 'Voltar',
                    value: 'back',
                    emoji: '939170462360035338'
                }
            ])
        )

        const dw = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
            .setCustomId('menu-selector')
            .setPlaceholder(`Veja mais sobre suas informações`)
            .addOptions([
                {
                    label: 'Seus cargos',
                    value: 'author-roles',
                    emoji: '939165099837501472'
                },
                {
                    label: 'Suas permissões',
                    value: 'author-perms',
                    emoji: '939176161253138442'
                }
            ])
        )

        message.reply({embeds: [
            new MessageEmbed()
            .setColor(message.member.displayHexColor)
            .setThumbnail(m.displayAvatarURL({ dynamic: true}))
            .setTitle(`Suas informações (${m.tag})`)
            .setFields(
                {
                    name: ":clock3: Tempo de conta criada:",
                    value:`\`${moment(t.user.createdAt).format('LLL')}\`\n(${moment(t.user.createdAt).startOf('day').fromNow()})`,
                    inline: true
                },
                {
                    name: ":notebook: Tempo que entrou no servidor", // .format('LL')
                    value: `\`${moment(t.joinedAt).format('LLL')}\`\n(${moment(t.joinedAt).fromNow()})`,
                    inline: true
                },
                {
                    name: ":id: ID",
                    value: `\`${m.id}\``,
                    inline: true
                }
            )
        ], components: [dw]}).then(msg => {
            const f = (interaction) => interaction.isSelectMenu()

            const c = msg.createMessageComponentCollector({ f })

            c.on("collect", async(coll) => {
                let v = coll.values[0]
                coll.deferUpdate()
                

                if (v === 'author-roles') {
      const r = coll.member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(role => role.toString())
      .slice(0, -1)
                    if (r.length === 0) {
                        msg.edit({embeds: [
                            new MessageEmbed()
                            .setColor(coll.member.displayHexColor)
                            .setTitle(`Seus cargos (${coll.user.tag})`)
                            .addField(`Total de cargos: ${r.length}:`, `Nenhum!`)
                        ], components: [dw]})   
                    } else {
                      msg.edit({embeds: [
                        new MessageEmbed()
                        .setColor(coll.member.displayHexColor)
                        .setTitle(`Seus cargos (${coll.user.tag})`)
                        .addField(`Total de cargos: ${r.length}:`, `\n${r.join(", ")}`)
                    ], components: [dwBackTo]})  
                    }
                      
                } else if (v === 'author-perms') { // desculpe pelo tanto de If, não conseguir achar outra maneira de evitar          

                    let arr = new Array()
                    if (coll.member.permissions.has('CREATE_INSTANT_INVITE'))
                    arr.push(`\`Criar convite instantâneo\``)
                    if (coll.member.permissions.has('ADMINISTRATOR'))
                    arr.push(`\`Administrador\``)
                    if (coll.member.permissions.has('KICK_MEMBERS'))
                    arr.push(`\`Expulsar membros\``)
                    if (coll.member.permissions.has('BAN_MEMBERS'))
                    arr.push(`\`Banir membros\``)
                    if (coll.member.permissions.has('MANAGE_CHANNELS'))
                    arr.push(`\`Gerenciar canais\``)
                    if (coll.member.permissions.has('MANAGE_GUILD'))
                    arr.push(`\`Gerenciar servidor\``)
                    if (coll.member.permissions.has('ADD_REACTIONS'))
                    arr.push(`\`Adicionar reações\``)
                    if (coll.member.permissions.has('VIEW_AUDIT_LOG'))
                    arr.push(`\`Ver registro de auditoria\``)
                    if (coll.member.permissions.has('PRIORITY_SPEAKER'))
                    arr.push(`\`Voz Prioritária\``)
                    if (coll.member.permissions.has('STREAM'))
                    arr.push(`\`Ao vivo\``)
                    if (coll.member.permissions.has('SEND_MESSAGES'))
                    arr.push(`\`Enviar mensagens\``)
                    if (coll.member.permissions.has('SEND_TTS_MESSAGES'))
                    arr.push(`\`Enviar mensagens em TTS\``)
                    if (coll.member.permissions.has('VIEW_CHANNEL'))
                    arr.push(`\`Ver canais\``)
                    if (coll.member.permissions.has('MANAGE_MESSAGES'))
                    arr.push(`\`Gerenciar mensagens\``)
                    if (coll.member.permissions.has('EMBED_LINKS'))
                    arr.push(`\`Enviar links\``)
                    if (coll.member.permissions.has('ATTACH_FILES'))
                    arr.push(`\`Enviar arquivos\``)
                    if (coll.member.permissions.has('READ_MESSAGE_HISTORY'))
                    arr.push(`\`Ler histórico de mensagem\``)
                    if (coll.member.permissions.has('MENTION_EVERYONE'))
                    arr.push(`\`Mencionar everyone e cargos\``)
                    if (coll.member.permissions.has('USE_EXTERNAL_EMOJIS'))
                    arr.push(`\`Usar emojis externos\``)
                    if (coll.member.permissions.has('USE_EXTERNAL_STICKERS'))
                    arr.push(`\`Usar figurinhas externas\``)
                    if (coll.member.permissions.has('VIEW_GUILD_INSIGHTS'))
                    arr.push(`\`Ver análises do servidor\``)
                    if (coll.member.permissions.has('CONNECT'))
                    arr.push(`\`Conectar\``)
                    if (coll.member.permissions.has('SPEAK'))
                    arr.push(`\`Falar\``)
                    if (coll.member.permissions.has('MUTE_MEMBERS'))
                    arr.push(`\`Mutar membros\``)
                    if (coll.member.permissions.has('DEAFEN_MEMBERS'))
                    arr.push(`\`Ensurdecer Membros\``)
                    if (coll.member.permissions.has('MOVE_MEMBERS'))
                    arr.push(`\`Mover membros\``)
                    if (coll.member.permissions.has('CHANGE_NICKNAME'))
                    arr.push(`\`Alterar apelido\``)
                    if (coll.member.permissions.has('MANAGE_NICKNAMES'))
                    arr.push(`\`Gerenciar apelidos\``)
                    if (coll.member.permissions.has('MANAGE_ROLES'))
                    arr.push(`\`Gerenciar cargos\``)
                    if (coll.member.permissions.has('MANAGE_WEBHOOKS'))
                    arr.push(`\`Gerenciar webhooks\``)
                    if (coll.member.permissions.has('MANAGE_EMOJIS_AND_STICKERS'))
                    arr.push(`\`Gerenciar emojis e figurinhas\``)
                    if (coll.member.permissions.has('USE_APPLICATION_COMMANDS'))
                    arr.push(`\`Usar comandos de /\``)
                    if (coll.member.permissions.has('REQUEST_TO_SPEAK'))
                    arr.push(`\`Pedir para falar\``)
                    if (coll.member.permissions.has('MANAGE_EVENTS'))
                    arr.push(`\`Gerenciar eventos\``)
                    if (coll.member.permissions.has('MANAGE_THREADS'))
                    arr.push(`\`Gerenciar Threads\``)
                    if (coll.member.permissions.has('USE_PUBLIC_THREADS') || coll.member.permissions.has('USE_PRIVATE_THREADS') || coll.member.permissions.has('SEND_MESSAGES_IN_THREADS'))
                    arr.push(`\`Falar em threads\``)
                    if (coll.member.permissions.has('CREATE_PUBLIC_THREADS'))
                    arr.push(`\`Criar threads públicos\``)
                    if (coll.member.permissions.has('CREATE_PRIVATE_THREADS'))
                    arr.push(`\`Criar threads privados\``)
                    if (coll.member.permissions.has('START_EMBEDDED_ACTIVITIES'))
                    arr.push(`\`Iniciar atividades\``)
                    if (coll.member.permissions.has('MODERATE_MEMBERS'))
                    arr.push(`\`Gerenciar moderação do servidor\``)
                    if (coll.member.permissions.has('USE_VAD'))
                    arr.push(`\`Utilizar detecção de voz\``)

                    msg.edit({embeds: [
                        new MessageEmbed()
                        .setColor(coll.member.displayHexColor)
                        .setTitle(`Suas permissões (${coll.user.tag})`)
                        .addField(`Perms:`, `${arr.join(`, `)}`)
                    ], components: [dwBackTo]}) 

                } else if (v === 'back') {
                    msg.edit({embeds: [
                        new MessageEmbed()
                        .setColor(message.member.displayHexColor)
                        .setThumbnail(m.displayAvatarURL({ dynamic: true}))
                        .setTitle(`Suas informações (${m.tag})`)
                        .setFields(
                            {
                                name: ":clock3: Tempo de conta criada:",
                                value:`\`${moment(t.user.createdAt).format('LLL')}\`\n(${moment(t.user.createdAt).startOf('day').fromNow()})`,
                                inline: true
                            },
                            {
                                name: ":notebook: Tempo que entrou no servidor", // .format('LL')
                                value: `\`${moment(t.joinedAt).format('LLL')}\`\n(${moment(t.joinedAt).fromNow()})`,
                                inline: true
                            },
                            {
                                name: ":id: ID",
                                value: `\`${m.id}\``,
                                inline: true
                            }
                        )
                    ], components: [dw]})
                }
            })
        })
        
    } else if (usuário) { // agora com usuário
        const dwBackTo = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
            .setCustomId('back')
            .addOptions([
                {
                    label: 'Voltar',
                    value: 'back',
                    emoji: '939170462360035338'
                }
            ])
        )

        const dw = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
            .setCustomId('menu-selector')
            .setPlaceholder(`Veja mais informações`)
            .addOptions([
                {
                    label: 'Cargos',
                    value: 'author-roles',
                    emoji: '939165099837501472'
                },
                {
                    label: 'Permissões',
                    value: 'author-perms',
                    emoji: '939176161253138442'
                }
            ])
        )
        message.reply({embeds: [
            new MessageEmbed()
            .setColor(usuário.displayHexColor)
            .setThumbnail(usuário.displayAvatarURL({ dynamic: true}))
            .setTitle(`Informações de: ${usuário.user.tag}`)
            .setFields(
                {
                    name: ":clock3: Tempo de conta criada:",
                    value: `\`${moment(usuário.user.createdAt).format('LLL')}\`\n(${moment(usuário.user.createdAt).startOf('day').fromNow()})`,
                    inline: true
                },
                {
                    name: ":notebook: Tempo que entrou no servidor",
                    value: `\`${moment(usuário.joinedAt).format('LLL')}\`\n(${moment(usuário.joinedAt).fromNow()})`,
                    inline: true
                },
                {
                    name: ":id: ID",
                    value: `\`${usuário.id}\``,
                    inline: true
                }
            )
        ], components: [dw]}).then(msg => {
            const f = (interaction) => interaction.isSelectMenu()

            const c = msg.createMessageComponentCollector({ f })

            c.on("collect", async(coll) => {
                let v = coll.values[0]
                coll.deferUpdate()
                

                if (v === 'author-roles') {
      const r = usuário.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(role => role.toString())
      .slice(0, -1)
                    if (r.length === 0) {
                        msg.edit({embeds: [
                            new MessageEmbed()
                            .setColor(usuário.displayHexColor)
                            .setTitle(`Cargos de ${usuário.user.tag}`)
                            .addField(`Total de cargos: ${r.length}:`, `Nenhum!`)
                        ], components: [dw]})   
                    } else {
                      msg.edit({embeds: [
                        new MessageEmbed()
                        .setColor(usuário.displayHexColor)
                        .setTitle(`Cargos de: ${coll.user.tag}`)
                        .addField(`Total de cargos: ${r.length}:`, `\n${r.join(", ")}`)
                    ], components: [dwBackTo]})  
                    }
                      
                } else if (v === 'author-perms') {                    

                    let arr = new Array()
                    if (usuário.permissions.has('CREATE_INSTANT_INVITE'))
                    arr.push(`\`Criar convite instantâneo\``)
                    if (usuário.permissions.has('ADMINISTRATOR'))
                    arr.push(`\`Administrador\``)
                    if (usuário.permissions.has('KICK_MEMBERS'))
                    arr.push(`\`Expulsar membros\``)
                    if (usuário.permissions.has('BAN_MEMBERS'))
                    arr.push(`\`Banir membros\``)
                    if (usuário.permissions.has('MANAGE_CHANNELS'))
                    arr.push(`\`Gerenciar canais\``)
                    if (usuário.permissions.has('MANAGE_GUILD'))
                    arr.push(`\`Gerenciar servidor\``)
                    if (usuário.permissions.has('ADD_REACTIONS'))
                    arr.push(`\`Adicionar reações\``)
                    if (usuário.permissions.has('VIEW_AUDIT_LOG'))
                    arr.push(`\`Ver registro de auditoria\``)
                    if (usuário.permissions.has('PRIORITY_SPEAKER'))
                    arr.push(`\`Voz Prioritária\``)
                    if (usuário.permissions.has('STREAM'))
                    arr.push(`\`Ao vivo\``)
                    if (usuário.permissions.has('SEND_MESSAGES'))
                    arr.push(`\`Enviar mensagens\``)
                    if (usuário.permissions.has('SEND_TTS_MESSAGES'))
                    arr.push(`\`Enviar mensagens em TTS\``)
                    if (usuário.permissions.has('VIEW_CHANNEL'))
                    arr.push(`\`Ver canais\``)
                    if (usuário.permissions.has('MANAGE_MESSAGES'))
                    arr.push(`\`Gerenciar mensagens\``)
                    if (usuário.permissions.has('EMBED_LINKS'))
                    arr.push(`\`Enviar links\``)
                    if (usuário.permissions.has('ATTACH_FILES'))
                    arr.push(`\`Enviar arquivos\``)
                    if (usuário.permissions.has('READ_MESSAGE_HISTORY'))
                    arr.push(`\`Ler histórico de mensagem\``)
                    if (usuário.permissions.has('MENTION_EVERYONE'))
                    arr.push(`\`Mencionar everyone e cargos\``)
                    if (usuário.permissions.has('USE_EXTERNAL_EMOJIS'))
                    arr.push(`\`Usar emojis externos\``)
                    if (usuário.permissions.has('USE_EXTERNAL_STICKERS'))
                    arr.push(`\`Usar figurinhas externas\``)
                    if (usuário.permissions.has('VIEW_GUILD_INSIGHTS'))
                    arr.push(`\`Ver análises do servidor\``)
                    if (usuário.permissions.has('CONNECT'))
                    arr.push(`\`Conectar\``)
                    if (usuário.permissions.has('SPEAK'))
                    arr.push(`\`Falar\``)
                    if (usuário.permissions.has('MUTE_MEMBERS'))
                    arr.push(`\`Mutar membros\``)
                    if (usuário.permissions.has('DEAFEN_MEMBERS'))
                    arr.push(`\`Ensurdecer Membros\``)
                    if (usuário.permissions.has('MOVE_MEMBERS'))
                    arr.push(`\`Mover membros\``)
                    if (usuário.permissions.has('CHANGE_NICKNAME'))
                    arr.push(`\`Alterar apelido\``)
                    if (usuário.permissions.has('MANAGE_NICKNAMES'))
                    arr.push(`\`Gerenciar apelidos\``)
                    if (usuário.permissions.has('MANAGE_ROLES'))
                    arr.push(`\`Gerenciar cargos\``)
                    if (usuário.permissions.has('MANAGE_WEBHOOKS'))
                    arr.push(`\`Gerenciar webhooks\``)
                    if (usuário.permissions.has('MANAGE_EMOJIS_AND_STICKERS'))
                    arr.push(`\`Gerenciar emojis e figurinhas\``)
                    if (usuário.permissions.has('USE_APPLICATION_COMMANDS'))
                    arr.push(`\`Usar comandos de /\``)
                    if (usuário.permissions.has('REQUEST_TO_SPEAK'))
                    arr.push(`\`Pedir para falar\``)
                    if (usuário.permissions.has('MANAGE_EVENTS'))
                    arr.push(`\`Gerenciar eventos\``)
                    if (usuário.permissions.has('MANAGE_THREADS'))
                    arr.push(`\`Gerenciar Threads\``)
                    if (usuário.permissions.has('USE_PUBLIC_THREADS') || usuário.permissions.has('USE_PRIVATE_THREADS') || usuário.permissions.has('SEND_MESSAGES_IN_THREADS'))
                    arr.push(`\`Falar em threads\``)
                    if (usuário.permissions.has('CREATE_PUBLIC_THREADS'))
                    arr.push(`\`Criar threads públicos\``)
                    if (usuário.permissions.has('CREATE_PRIVATE_THREADS'))
                    arr.push(`\`Criar threads privados\``)
                    if (usuário.permissions.has('START_EMBEDDED_ACTIVITIES'))
                    arr.push(`\`Iniciar atividades\``)
                    if (usuário.permissions.has('MODERATE_MEMBERS'))
                    arr.push(`\`Gerenciar moderação do servidor\``)
                    if (usuário.permissions.has('USE_VAD'))
                    arr.push(`\`Utilizar detecção de voz\``)

                    msg.edit({embeds: [
                        new MessageEmbed()
                        .setColor(usuário.displayHexColor)
                        .setTitle(`Permissões de ${usuário.user.tag}`)
                        .addField(`Permissões:`, `${arr.join(`, `)}`)
                    ], components: [dwBackTo]}) 

                } else if (v === 'back') {
                    msg.edit({embeds: [
                        new MessageEmbed()
                        .setColor(usuário.displayHexColor)
                        .setThumbnail(usuário.displayAvatarURL({ dynamic: true}))
                        .setTitle(`Informações de: ${usuário.user.tag}`)
                        .setFields(
                            {
                                name: ":clock3: Tempo de conta criada:",
                                value: `\`${moment(usuário.user.createdAt).format('LLL')}\`\n(${moment(usuário.user.createdAt).startOf('day').fromNow()})`,
                                inline: true
                            },
                            {
                                name: ":notebook: Tempo que entrou no servidor",
                                value: `\`${moment(usuário.joinedAt).format('LLL')}\`\n(${moment(usuário.joinedAt).fromNow()})`,
                                inline: true
                            },
                            {
                                name: ":id: ID",
                                value: `\`${usuário.id}\``,
                                inline: true
                            }
                        )
                    ], components: [dw]})
                }
            })
        })
      
      
        
    } else if (!usuário) { // acaso não tiver o membro no servidor...
        return message.reply("**<:noentry:921415736566636575> | Usuário não identificado. Certifique-se se está mencionando um usuário válido ou utilizando um ID válido!**")
    }
}}