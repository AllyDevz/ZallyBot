const Discord = require('discord.js')
info = require("../../Database/user.js")
module.exports =  {
    name: "registrar",
    description: "Se registrar no site",
    type: "CHAT_INPUT",
    
    run: async (client, interaction, args) => {

        const embed = new Discord.MessageEmbed()
        .setColor('GREEN') //cor da embed
        .setDescription(`Olá, \`${interaction.user.tag}\` Obrigado por se registrar.`) //descrição da embed (escreve o que vc bem entender, para fazer paragrafo utilize \n)
        .setFooter({text: `Comando requisitado por: ${interaction.user.tag}`}) //footer da embed
        
        const button = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton() //button
            .setStyle('LINK') //estilo do button (tem de ser esse por conta de ser link)
            .setEmoji('📎') //emoji
            .setLabel('Sucesso seu perfil foi criado verifique') //texto
            .setURL(`https://zallybot.herokuapp.com/dc/${interaction.user.id}`)//coloque aqui o link de add do seu bot
        )
        if(info.economia.registro === "true"){
            interaction.reply("voce ja foi registrado :D")
        } else {
            let teste = await info.findOne({
                userID: url
            }) || { economia: { banco: 0, money: 0},usuario: { type: String, default: "Usuario Não Registrado" }}
            interaction.reply({ embeds: [embed], components: [button] })
            teste.economia.registro = "true", teste.save()
            teste.economia.usuario = `${interaction.username}`, teste.save()
        }
        

    }
}