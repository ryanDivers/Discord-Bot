import { Client } from 'discord.js';
import { BOT_TOKEN } from './src/config';
import events from './src/events';
import messageHandlers from './src/handlers/messageHandlers';

const client = new Client({ intents: ["Guilds", "GuildMessages", "MessageContent", "GuildVoiceStates"]});
client.login(BOT_TOKEN);

client.on(events.newMessage, messageHandlers);