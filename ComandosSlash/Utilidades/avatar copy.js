const {
    MessageEmbed
} = require('discord.js')
const Discord = require("discord.js");
module.exports = {
    name: 'gay',
    description: '[🏳‍🌈?]',
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
        }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"#5234eb"}}
        function gay(link){
          const g = link
          return `https://some-random-api.ml/canvas/gay?avatar=${g}`
        }
        const img = p.displayAvatarURL({
          dynamic: true,
          size: 1024
      })
        const embed = new MessageEmbed()
            .setTitle(`${p.username}'s Avatar`)
            .setImage(gay(`${img}`))
            .setColor("BLUE")
        interaction.reply({embeds: [embed]})
        
        
         //lets try it now 
    }
}