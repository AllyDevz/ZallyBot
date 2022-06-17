const translate = require("@iamtraction/google-translate");

module.exports = {
    name: "traduzir",
    description: "〔 ⚙️ Utilidade 〕Tradizir Uma Palavra!",
    options: [
        {
            name: "texto",
            description: "Digite o texto para traduzir",
            type: "STRING",
            required: true,
        },
        {
            name: "lingua",
            description: "Digite a lingua para traduzir",
            type: "STRING",
            required: true,
        }
    ],
    run: async (client, interaction) => {
        const texto = interaction.options.getString("texto");
        const lingua = interaction.options.getString("lingua");
        try {
            const trad = await translate(texto, {
                to: lingua,
            });
            interaction.reply(`Tradução: ${trad.text ? trad.text : ""}`);
        }
        catch {
            return interaction.reply("Essa linguagem não existe!");
        }
    },
};