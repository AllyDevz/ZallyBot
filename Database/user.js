const { Schema, model } = require("mongoose");

const userset = new Schema({
  userID: { type: String },
  db: {type: String},

  economia: {
      trabalho: {
          maxmoney: { type: Number },
          trampo: { type: String },
          cooldown: { type: Number }
      },
      marry:{
        casado: { type: Boolean, default: false },
        com: { type: String }
      },
      banco: { type: Number, default: 0 },
      money: { type: Number, default: 0 },
      mtc: { type: String, default: "Manutençao offline" },
      sobremim: { type: String, default: "Use /sobremim para alterar este texto."},
      background: { type: String, default: "./vFqyhnK.png"}
  },
  cooldowns: {
    trabalho: { type: String, default: 0 },
    work: { type: String, default: 0 },
    daily: { type: String, default: 0 },
  },
});

module.exports = model("Usuários", userset);
