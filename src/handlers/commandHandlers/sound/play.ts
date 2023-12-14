import { VoiceConnection, joinVoiceChannel } from '@discordjs/voice';
import { Message } from 'discord.js';
import { Logger } from 'pino';
import { getDetails } from '../../../helpers/inputHelpers';
import player from '../../../lib/Player';
import { MessageWithField, isValidPlayMessage } from '../../../helpers/validators';
import { ReplyError, sendErrorMessage } from '../../../errors';

const ensureValidPlayMessage = (message: Message, logger: Logger): MessageWithField => {
    if (!isValidPlayMessage(message)) {
        const errorMessage = 'Message not in usable format';
        logger.error({ msg: errorMessage });
        throw new ReplyError(errorMessage);
    }
    return message;
};

const ensureQueueLengthBelowMax = (logger: Logger) : void => {
    const queue = player.getQueue();
    if (queue.length >= 20) {
        const errorMessage = 'Max Queue size reached';
        logger.error({ msg: errorMessage });
        throw new ReplyError(errorMessage);
    }
};

const joinChannel = (message: MessageWithField, logger: Logger): VoiceConnection => {
    logger.info({ msg: 'Joining Voice Channel' });
    return joinVoiceChannel({
        channelId: message.member.voice.channelId || '',
        guildId: message.guildId,
        adapterCreator: message.guild.voiceAdapterCreator,
    });
};

const subscribeToChannel = (connection: VoiceConnection, logger: Logger): void => {
    logger.info({ msg: 'Subscribing player to Voice Channel' });
    const subscription = connection.subscribe(player.returnInstance());

    if (subscription) {
        logger.info({ msg: 'Connection Subscribed' });
    }
};

const play = async (message: Message, logger: Logger): Promise<void> => {
    logger.info({ msg: 'Handling Play Command' });
    try {
        // TS does not recognise nested type predicate, needs a relook
        const messageWithField = ensureValidPlayMessage(message, logger);
        ensureQueueLengthBelowMax(logger);

        const url = getDetails(messageWithField);
        await player.addToQueue(url);

        const voiceConnection = joinChannel(messageWithField, logger);
        subscribeToChannel(voiceConnection, logger);
    } catch (err) {
        sendErrorMessage(message, err);
        logger.error({ msg: 'Error handling Play command', error: err });
    }
};

const forcePlay = async (message: Message, logger: Logger): Promise<void> => {
    logger.info({ msg: 'Handling Force Play Command' });

    try {
        // TS does not recognise nested type predicate, needs a relook
        const messageWithField = ensureValidPlayMessage(message, logger);
        ensureQueueLengthBelowMax(logger);

        const url = getDetails(messageWithField);
        await player.forcePlay(url);

        const voiceConnection = joinChannel(messageWithField, logger);
        subscribeToChannel(voiceConnection, logger);
    } catch (err) {
        sendErrorMessage(message, err);
        logger.error({ msg: 'Error handling Force Play command', error: err });
    }
};

export { play, forcePlay };
