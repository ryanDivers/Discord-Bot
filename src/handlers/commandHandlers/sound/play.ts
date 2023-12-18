import { VoiceConnection, joinVoiceChannel } from '@discordjs/voice';
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
    if (queue.length >= 20) {
        throw new ReplyError('Max Queue size reached');
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
    // TS does not recognise nested type predicate, needs a relook
    const messageWithField = ensureValidPlayMessage(message);
    ensureQueueLengthBelowMax();

    const url = getDetails(messageWithField);
    await player.addToQueue(url);

    const voiceConnection = joinChannel(messageWithField, logger);
    subscribeToChannel(voiceConnection, logger);
};

const forcePlay = async (message: Message, logger: Logger): Promise<void> => {
    logger.info({ msg: 'Handling Force Play Command' });

    // TS does not recognise nested type predicate, needs a relook
    const messageWithField = ensureValidPlayMessage(message);
    ensureQueueLengthBelowMax();

    const url = getDetails(messageWithField);
    await player.forcePlay(url);

    const voiceConnection = joinChannel(messageWithField, logger);
    subscribeToChannel(voiceConnection, logger);
};

export { play, forcePlay };
