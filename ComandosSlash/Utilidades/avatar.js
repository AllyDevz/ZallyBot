const {
    MessageEmbed
} = require('discord.js')
const Discord = require("discord.js");
module.exports = {
    name: 'avatar',
    description: '[🎱 | Mostra o Avatar da Pessoa ]',
    options: [{
        name: 'usuario',
        type: 'USER',
        description: 'Select a user/id',
        required: false,
    }],
    run: async (client, interaction, options) => {
        const usuario = interaction.options.getUser('usuario')
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
        }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
        
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
                      .setTitle(`${p.username}'s Avatartest`)
                      .setColor(userdb.economia.color)
                      .setImage(p.displayAvatarURL({
                          dynamic: true,
                          size: 1024
                      }))
                      .setDescription(`[Png](${p.avatarURL({ format: 'png' })}) | [Webp](${p.avatarURL({ dynamic: true })}) | [Jpg](${p.avatarURL({ format: 'jpg' })})`)
                      .setFooter(`Requested by: ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }));
                               ]})

                   }
     
                })//collector
                  
                })//.thens
        
        
        
         //lets try it now 
    }
}