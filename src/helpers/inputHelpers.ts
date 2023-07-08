import { Message } from "discord.js";
import { MESSAGE_PREFIX } from "../config";

const isMessageForBot = (message: Message) : boolean => !message.author.bot && message.content.startsWith(MESSAGE_PREFIX);

const getCommand = (message: Message) : string => {
    const commandBody = message.content.slice(MESSAGE_PREFIX.length);
    const command = commandBody.split(' ')[0];
    return command.toLowerCase();
}

export { isMessageForBot, getCommand };

