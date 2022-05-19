const Discord = require('discord.js')

module.exports =  {
    name: "geninvite",
    description: "Convide o bot para seu servidor",
    type: "CHAT_INPUT",
    options: [
        {
         name: "user",
         description: "user/id",
         type: 'USER',
         required: true
        },
        ],
    run: async (client, interaction, args) => {
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
        function bot(e){
            if(e === true){
            return p.id
            console.log(e)
            console.log(p)
            }
            if(e === false){
            interaction.channel.send("Impossivel Gerar para uma pessoa")
            }
        }
        console.log(p)
        
        const embed = new Discord.MessageEmbed()
        .setColor('#2f3136') //cor da embed
        .setTitle('Me adicione!') //titulo da embed
        .setDescription(`Olá, \`${interaction.user.tag}\` eu sou o eu sou o ${client.user.username} , .`) //descrição da embed (escreve o que vc bem entender, para fazer paragrafo utilize \n)
        .setFooter({text: `Comando requisitado por: ${interaction.user.tag}`, iconURL: 'https://images-ext-1.discordapp.net/external/0F39bQul3cH-yQaSXxBQvbjhPN03VuIOgB14tkiUpvU/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/962356709601460234/33d7e1d2861f1e28a87e50e2db45d741.webp?width=442&height=442'}) //footer da embed
        
        const button = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton() //button
            .setStyle('LINK') //estilo do button (tem de ser esse por conta de ser link)
            .setEmoji('📎') //emoji
            .setLabel(`${p.username}`) //texto
            .setURL(`https://discord.com/oauth2/authorize?client_id=${bot(p.bot)}&permissions=1103202674864&scope=applications.commands%20bot`)//coloque aqui o link de add do seu bot
        )

        interaction.reply({ embeds: [embed], components: [button] })
    }
}