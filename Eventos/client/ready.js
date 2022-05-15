const client = require("../../index");
const mongo = require("mongoose")
const os = require('os');
client.on("ready", async () =>{
let userdb = await client.userdb.findOne({
    userID: 395577430112206848
})

if(!userdb){
    const newuser = new client.userdb({ userID: 395577430112206848 })
    await newuser.save();
    
    userdb = await client.userdb.findOne({ userID: 395577430112206848 })
}
let usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();
let  getpercentage = 
((usedMemory/totalMemory) * 100).toFixed(2) + '%'
const novoserver = new info({
  memory: usedMemory,
  memoryporcent: getpercentage
})

let status = [ `${userdb.economia.mtc}`,
      `utilizado por ${client.guilds.cache.size} servidores.`,
      `Memória RAM utilizada em GB\`: \**${(usedMemory/ Math.pow(1024, 3)).toFixed(2)}`+`\nMemória RAM utilizada\`: \**${getpercentage}\**`],
    i = 0
  setInterval(() =>{
client.user.setActivity(`${status[i++ % status.length]}`, { 
    type: `WATCHING` 
})
  }, 1000 * 30); 

client.user.setStatus('dnd')
     

  console.log(`🤖 Bot on em ${client.user.tag} `)

})
