import { Message } from 'discord.js';
import { Logger } from 'pino';
import player from '../../../lib/Player';

const pause = (message: Message, logger: Logger): void => {
    logger.info({ msg: 'Pausing current song' });
    player.pause();
    message.reply('Current song paused');
};

const unpause = (message: Message, logger: Logger): void => {
    logger.info({ msg: 'Unpausing current song' });
    player.unpause();
    message.reply('Unpaused current song');
};

export { pause, unpause };
