import { joinVoiceChannel } from '@discordjs/voice';
import { Message } from 'discord.js';
import { Logger } from 'pino';
import { getDetails } from '../../../helpers/inputHelpers';
import player from '../../../lib/Player';
import { isValidPlayMessage } from '../../../helpers/validators';

const play = async (message: Message, logger: Logger): Promise<void> => {
    logger.info({ msg: 'Handling Sound Command' });

    if (!isValidPlayMessage(message)) {
        logger.warn({ msg: 'Message not in useable format' });
        message.reply('Message not in usable format');
        return;
    }

    const queue = player.getQueue();
    if (queue.length >= 20) {
        logger.warn({ msg: 'Max quesize reached' });
        message.reply('Play queue at max size');
        return;
    }

    const url = getDetails(message);
    await player.addToQueue(url);

    logger.info({ msg: 'Joining Voice Channel' });
    const connection = joinVoiceChannel({
        channelId: message.member.voice.channelId || '',
        guildId: message.guildId,
        adapterCreator: message.guild.voiceAdapterCreator,
    });

    logger.info({ msg: 'Subscribing player to Voice Channel' });
    const subscription = connection.subscribe(player.returnInstance());

    if (subscription) {
        logger.info({ msg: 'Playing Audio' });
    }
};

export { play };
