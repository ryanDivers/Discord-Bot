import { Message } from "discord.js";

const helpCommand = (message: Message): void => {
    message.reply('Help is not configured yet');
}

export { helpCommand };