const { MessageAttachment } = require("discord.js");
const { profileImage } = require("discord-arts");

module.exports = {
    name: "userinfo",
    description: "userinfo",
    type: 'CHAT_INPUT',
  options: [
    {
        name: "user",
        type: 6,
        description: "Select the user",
        required: false
    }

],

  run: async(client, interaction, args) => { 

        const discordUser = interaction.options.getUser("user") || interaction.user;
        await interaction.deferReply();
        const bufferImg = await profileImage(discordUser);
        const imgAttachment = new MessageAttachment(bufferImg, "profile.png");

        interaction.followUp({ files: [imgAttachment] });
    }
}