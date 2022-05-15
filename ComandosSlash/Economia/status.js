const Discord = require("discord.js");
const mongo = require('mongoose')
const db = require("quick.db")
module.exports = {
    name: "status",
    description: "Verifique se estou em modo manutençao",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        



    interaction.reply(db.get("global"))
    }}

function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}
