import { Message } from "discord.js";

const defaultCommand = (message: Message): void => {
    message.reply('Unknown Command');
};

export { defaultCommand };