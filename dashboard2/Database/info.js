const { Schema, model } = require("mongoose");

const userset = new Schema({
  userID: { type: String },
  db: { type: String },
  banimentos: { type: Number, default: 0 },
  economia: {
    trabalho: {
      maxmoney: { type: Number },
      trampo: { type: String },
      cooldown: { type: Number }
    },
    marry: {
      casado: { type: Boolean, default: false },
      com: { type: String }
    },
    banco: { type: Number, default: 0 },
    money: { type: Number, default: 0 },
    rep: { type: Number, default: 0 },
    waifu: { type: Number, default: 0 },
    ilulu: { type: Number, default: 0 },
    fafnir: { type: Number, default: 0 },
    color: { type: String, default: "36393e" },
    sobremim: { type: String, default: "Use /sobremim para alterar este texto." },
    premium: { type: String, default: "usuario comum" },
    background: { type: String, default: "./vFqyhnK.png" }
  },
  cooldowns: {
    trabalho: { type: String, default: 0 },
    work: { type: String, default: 0 },
    minerar: { type: String, default: 0 },
    daily: { type: String, default: 0 },
    reputacao: { type: Number, default: 0 },
  },
});

module.exports = model("Usuários", userset);