import { Message } from "discord.js";
import { Logger } from "pino";

const pingCommand = (message: Message, logger: Logger): void => {
    logger.info({ msg: 'Handling Ping command'});
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
}

export { pingCommand };