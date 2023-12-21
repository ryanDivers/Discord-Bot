import { Message } from 'discord.js';
import { Logger } from 'pino';
import { getDetails } from '../../../helpers/inputHelpers';
import player from '../../../lib/Player';
import { MessageWithField, isValidPlayMessage } from '../../../helpers/validators';
import { ReplyError } from '../../../errors';

const ensureValidPlayMessage = (message: Message): MessageWithField => {
    if (!isValidPlayMessage(message)) {
        throw new ReplyError('Message not in usable format');
    }
    return message;
};

const ensureQueueLengthBelowMax = () : void => {
    const queue = player.getQueue();
    if (queue.length >= 10) {
        throw new ReplyError('Max Queue size reached');
    }
};

const setPlayerChannelConfig = (message: MessageWithField): void => {
    player.setChannelConfig(
        message.member.voice.channelId || '',
        message.guildId,
        message.guild.voiceAdapterCreator,
    );
};

const play = async (message: Message, logger: Logger): Promise<void> => {
    logger.info({ msg: 'Handling Play Command' });
    // TS does not recognise nested type predicate, needs a relook
    const messageWithField = ensureValidPlayMessage(message);
    ensureQueueLengthBelowMax();

    setPlayerChannelConfig(messageWithField);
    const url = getDetails(messageWithField);
    await player.addToQueue(url);
};

const forcePlay = async (message: Message, logger: Logger): Promise<void> => {
    logger.info({ msg: 'Handling Force Play Command' });

    // TS does not recognise nested type predicate, needs a relook
    const messageWithField = ensureValidPlayMessage(message);
    ensureQueueLengthBelowMax();

    setPlayerChannelConfig(messageWithField);
    const url = getDetails(messageWithField);
    await player.forcePlay(url);
};

export { play, forcePlay };
