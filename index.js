require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});


client.on('ready', () => {
    console.log(`Bot online! Username: ${client.user.tag}`);
});


client.on('guildCreate', async (guild) => {
    console.log(`New Server: ${guild.name} (${guild.id})`);

    try {
        const owner = await client.users.fetch(process.env.OWNER_ID);
        await owner.send(`
Successfully Entered!
Server: ${guild.name}
Server ID: ${guild.id}
Member: ${guild.memberCount}
         `);
    } catch (err) {
        console.error("Failed:", err);
    }
});
// Login bot
client.login(process.env.TOKEN);

const blacklist = ["1446635917518442677"]; // blacklisted

client.on("guildCreate", async (guild) => {
    if (blacklist.includes(guild.id)) {
        console.log(`Server ${guild.name} is blacklisted. bot will leave.`);
        try {
            await guild.leave(); 
            console.log(`bot successfully leave: ${guild.name}`);
        } catch (err) {
            console.error("failure:", err);
        }
        return;
    }


    try {
        const owner = await client.users.fetch(process.env.OWNER_ID);
        await owner.send(`bot entered: ${guild.name} (${guild.id})`);
    } catch (err) {
        console.error("failed:", err);
    }
});
