import { Message } from 'discord.js';
import { Logger } from 'pino';
import player from '../../../lib/Player';

const skipSong = (message: Message, logger: Logger): void => {
    logger.info({ msg: 'Skipping current song' });
    player.skipSong();
    message.reply('Song has been skipped');
};

export { skipSong };
