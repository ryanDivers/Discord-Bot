import { Message } from "discord.js";
import { Logger } from "pino";

const defaultCommand = (message: Message, logger: Logger): void => {
    logger.info({ msg: 'Unknown Command'});
    message.reply('Unknown Command');
};

export { defaultCommand };