const fs = require("fs")
const os = require('os');
const db = require("quick.db")

module.exports = async (client) => {

//====Handler das Slahs====\\

const SlashsArray = []

  fs.readdir(`././ComandosSlash/`, (erro, pasta) => {

  pasta.forEach(subpasta => {

  

  fs.readdir(`././ComandosSlash/${subpasta}/`, (erro, arquivos) => {

  arquivos.forEach(arquivo => {

      

  if(!arquivo?.endsWith('.js')) return;
  if(!arquivo.endsWith(".js")) return
      

  arquivo = require(`../ComandosSlash/${subpasta}/${arquivo}`);

     

  if(!arquivo?.name) return;

    

  client.slashCommands.set(arquivo?.name, arquivo);

   

  SlashsArray.push(arquivo)

  });

    });

  });

});
client.on("guildMemberAdd", (member) => {
  let id = db.get(`contador_${member.guild.id}`);
  let canal = member.guild.channels.cache.get(id);
  if (!canal) return;

  let membros = member.guild.memberCount;
  canal.setName(`👥 Membros: ${membros}`)
})

client.on("guildMemberRemove", (member) => {
  let id = db.get(`contador_${member.guild.id}`);
  let canal = member.guild.channels.cache.get(id);
  if (!canal) return;

  let membros = member.guild.memberCount;
  canal.setName(`👥 Membros: ${membros}`)
})
client.on("ready", async () => {


//Este código serve pra registrar as slashs em 1 só servidor específico.
  client.on("ready", () => {
      const Guilds = client.guilds.cache.map(guild => guild.id);
      console.log(Guilds);
    });
  
  const Guilds = client.guilds.cache.map(guild => guild.id);
  console.log(Guilds);
  const guild = client.guilds.cache.get("975219630756986900")

  //if(!guild) {

    //console.log("O servidor específicado para registrar as slashs é inválido.", "Desligando...")

    //process.exit();

  //}
    process.on('unhandledRejection', (reason, p) => {
        console.log(' [antiCrash] :: Unhandled Rejection/Catch');
        console.log(reason, p);
        console.log("Rate Limit")
    });
    process.on("uncaughtException", (err, origin) => {
        console.log(' [antiCrash] :: Uncaught Exception/Catch');
        console.log(err, origin);
        
    }) 
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
        console.log(err, origin);
    });
    process.on('multipleResolves', (type, promise, reason) => {
        console.log(' [antiCrash] :: Multiple Resolves');
        console.log(type, promise, reason);
        
    });
    const op = "global"
    if(op === "global"){
      client.application.commands.set(SlashsArray);
    }
    if(op === "privado"){
      guild.commands.set(SlashsArray);
    }

    

 // Mas lembre-se! Registrar as slashs no cache global demora entre 1 e 3 horas, já em algum servidor específico é instantâneo. Eu aconcelho fazer todos os comandos em um servidor e depois que tudo estiver pronto passa-los para o global.

    });

//====Handler dos eventin====\\

  fs.readdir(`././Eventos/`, (erro, pasta) =>{

  pasta.forEach(subpasta =>{

  fs.readdir(`././Eventos/${subpasta}/`, (erro, arquivos) =>{

  arquivos.forEach(arquivo =>{

          

  if(!arquivo.endsWith('.js')) return;

   

  require(`../Eventos/${subpasta}/${arquivo}`);



  });

    });

  });

});

};

