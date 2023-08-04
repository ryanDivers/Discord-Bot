import { Message } from "discord.js";
import { Logger } from "pino";

const help = (message: Message, logger: Logger): void => {
    logger.info({ msg: 'Handling Help Command'});
    message.reply('Help is not configured yet');
}

export { help };