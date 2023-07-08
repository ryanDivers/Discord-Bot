import { Message } from "discord.js";
import { MESSAGE_PREFIX } from "../config";

const isMessageForBot = (message: Message) : boolean => !message.author.bot && message.content.startsWith(MESSAGE_PREFIX);

const getCommand = (message: Message) : string => {
    const commandBody = message.content.slice(MESSAGE_PREFIX.length);
    const command = commandBody.split(' ')[0];
    return command.toLowerCase();
}

const getDetails = (message: Message) : string => {
    const commandBody = message.content.slice(MESSAGE_PREFIX.length);
    const details = commandBody.split(' ')[1];
    return details;
};

export { isMessageForBot, getCommand, getDetails };

