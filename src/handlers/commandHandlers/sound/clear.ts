import { Message } from 'discord.js';
import { Logger } from 'pino';
import player from '../../../lib/Player';

const clearQueue = (message: Message, logger: Logger): void => {
    logger.info({ msg: 'Handling Clear Queue' });
    player.clearQueue();
    message.reply('Queue has been cleared');
};

export { clearQueue };
