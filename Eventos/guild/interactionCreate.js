const client = require("../../index");
const Discord = require("discord.js")
info = require(".../Database/user.js")
client.on("interactionCreate", async (interaction) => {
  
  if (interaction.isCommand()) {

    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return console.log("Ocorreu Um Error")
    
    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
    const userId = interaction.member.user.id;
      
    const user = client.users.cache.find(user => user.id === userId)



      const p = getUserFromMention(usuario)
    let teste = await info.findOne({
      userID: interaction.user.id
  }) || { economia: { banco: 0, money: 0}, color:"36393e",sobremim: { type: String, default: "Para Altera o Texto va no seu servidor onde esta o bot e dige /sobremim" },rep: { type: Number, default: 0 },usuario: { type: String, default: "Usuario Não Registrado" }}
    if(teste.economia.registro === "true"){
      return;
    } else{
      userdb.economia.registro = "true", userdb.save()
      userdb.economia.usuario = `${user.username}`, userdb.save()
    }
      cmd.run(client, interaction)
    
  }

});
