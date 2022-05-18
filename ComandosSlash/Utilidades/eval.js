const Discord = require("discord.js")
module.exports = {
name: "eval",
  description: "testes bot",
  type: "CHAT_INPUT",
  options: [
    {
    name: "codigo",
    description: "Escreva seu código aqui",
    type:"STRING", 
    require: true,
  },
           ],
  run: async(client, interaction, args) => {
    const { inspect } = require('util');
    let command = interaction.options.getString("codigo")
    let embed = new Discord.MessageEmbed();
    let ferinha_perm = interaction.member.permissions.has("MANAGE_GUILD");
    let ferinha_perm_erro_msg = `:x: | ${interaction.author} Você não possui a permissão **Gerenciar Servidor**.`;
    if (!ferinha_perm) return interaction.reply({ferinha_perm_erro_msg, ephemeral: true});
    try {
      let evaled = eval(command);
        embed.addField(`Tipo`, `\`\`\`js\n${typeof(evaled)}\`\`\``, true);
        embed.addField(`Saída`, `\`\`\`js\n${inspect(evaled, {depth: 0})}\`\`\``);
       embed.setColor(`FFFFFF`)
      interaction.reply({ embeds: [embed] })
        .catch(err => console.log("erro: " + err.message));

    } catch (error) {
      embed.addField(`Erro`, `\`\`\`js\n${error}\`\`\``);
      interaction.reply({ embeds: [embed] });
    } 
  }
} 