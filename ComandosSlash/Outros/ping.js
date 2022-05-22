const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Veja o atual ping do bot.",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
    const userdb = await client.userdb.findOne({
            userID: user.id
        }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto.", background:"./vFqyhnK.png", color:"36393e"}}
           
   const st = process.hrtime()   
   await client.userdb.findOne({
    userid: interaction.member.id,
  });         
   const sto = process.hrtime(st)
      
   const pingDB = Math.round((sto[0] * 1e9 + sto[1]) / 1e6);
    
      const embed = new MessageEmbed()
      .setColor(userdb.economia.color)
       .setTitle("🎾 ****»**** **PONG!**")
        .setDescription(`> **ping do bot** \`${client.ws.ping}\`**ms!**
> **Mongodb:** \`${pingDB}\` **ms!**`)
        interaction.reply({embeds: [embed]});
    },
};

