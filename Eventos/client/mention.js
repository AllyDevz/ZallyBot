const client = require("../../index");
const Discord = require("discord.js")

client.on("guildCreate", async (guild) => {
    
        const fetchedLogs = await guild.fetchAuditLogs({
          limit: 1,
          type: 'BOT_ADD'
        })
        const addAuthorLog = fetchedLogs.entries.first();
        const { executor, target } = addAuthorLog;
        
        executor.send(`**Olá ${executor.tag}**, __muito obrigado por me adicionar no servidor \`${guild.name} (${guild.id})__\` `)
       
}) 