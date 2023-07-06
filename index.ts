import { Client } from 'discord.js';
import { BOT_TOKEN, MESSAGE_PREFIX } from './src/config';

const client = new Client({ intents: ["Guilds", "GuildMessages", "MessageContent"]});
client.login(BOT_TOKEN);

client.on("messageCreate", function(message) {
    console.log(message);
    if (message.author.bot) return;
    if (!message.content.startsWith(MESSAGE_PREFIX as string)) return;

    const commandBody = message.content.slice(MESSAGE_PREFIX.length);
    const args = commandBody.split(' ');
    const command = args.shift()?.toLowerCase();

    if (command === 'ping') {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }

    if (command === 'catalina') {
        message.reply('Catalina is the best');
    }
});