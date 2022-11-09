const client = require("../../index");
const Discord = require("discord.js")
client.on("interactionCreate", async (interaction) => {
  
  if (interaction.isCommand()) {

    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return console.log("Ocorreu Um Error")
    
    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)
    
  }

});
