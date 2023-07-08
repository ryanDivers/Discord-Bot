import { Message } from "discord.js";

const pingCommand = (message: Message): void => {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
}

export { pingCommand };