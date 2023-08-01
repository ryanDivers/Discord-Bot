import { Message } from "discord.js";
import { Logger } from "pino";
import player from "../../../lib/Player";

const stop = (message: Message, logger: Logger): void => {
    logger.info({ msg: 'Stopping player' });
    player.stop();
    message.reply('Player stopped');
}

export { stop };