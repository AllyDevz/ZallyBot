const {
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: 'avatar',
    description: 'Shows users avatar',
    options: [{
        name: 'target',
        type: 'USER',
        description: 'Select a user/id',
        required: false,
    }],
    run: async (client, interaction, options) => {
        const usuario = interaction.options.getUser('target')
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
        const embed = new MessageEmbed()
            .setTitle(`${p.username}'s Avatar`)
            .setColor('BLUE')
            .setImage(p.displayAvatarURL({
                dynamic: true,
                size: 1024
            }))
            .setDescription(`[Png](${p.avatarURL({ format: 'png' })}) | [Webp](${p.avatarURL({ dynamic: true })}) | [Jpg](${p.avatarURL({ format: 'jpg' })})`)
            .setFooter(`Requested by: ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }));
        
        await interaction.reply({
            embeds: [embed]
        });
        
        
        
         //lets try it now 
    }
}