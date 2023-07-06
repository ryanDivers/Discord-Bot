import { Message } from "discord.js";
import { MESSAGE_PREFIX } from "../config";

const isMessageForBot = (message: Message) : boolean => !message.author.bot && message.content.startsWith(MESSAGE_PREFIX);
const getCommand = (message: Message) : string => {
    const commandBody = message.content.slice(MESSAGE_PREFIX.length);
    const command = commandBody.split(' ')[0];
    return command.toLowerCase();
}

const newMessageHandler = (message: Message) : void => {
    if (!isMessageForBot(message)) return;
    const command = getCommand(message);

    switch (command) {
        case 'ping':
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
            return;
        case 'help':
            message.reply('Help is not configured yet');
            return;
        default:
            message.reply('Unknown Command');
            return;
    }
};

export { newMessageHandler };