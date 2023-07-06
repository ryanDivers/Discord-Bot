import { Client } from 'discord.js';
import { BOT_TOKEN } from './src/config';
import { newMessageHandler } from './src/handlers';

const client = new Client({ intents: ["Guilds", "GuildMessages", "MessageContent"]});
client.login(BOT_TOKEN);

client.on('messageCreate', newMessageHandler);