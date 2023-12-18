import { Message } from 'discord.js';
import { Logger } from 'pino';
import { isMessageForBot, getCommand } from '../helpers/inputHelpers';
import messageEvents from './commandHandlers';
import { defaultCommand } from './commandHandlers/default';
import { getEventScopedLogger } from '../Logger';
import { ReplyError } from '../errors';

const isReplyError = (err: unknown): err is ReplyError => err instanceof ReplyError;

const errorHandler = (message: Message, err: unknown, logger: Logger): void => {
    if (isReplyError(err)) {
        logger.error({ msg: err.replyMessage, error: err });
        message.reply(err.replyMessage);
    } else {
        logger.error({ msg: 'Unexpected Server Error', error: err });
        message.reply('Unexpected Error');
    }
};

const messageHandlers = async (message: Message): Promise<void> => {
    const logger = getEventScopedLogger(message);

    if (!isMessageForBot(message)) return;
    const command = getCommand(message);

    const eventHandler = messageEvents[command];
    if (!eventHandler) {
        // eslint-disable-next-line consistent-return
        return defaultCommand(message, logger);
    }

    try {
        await eventHandler(message, logger);
    } catch (err: unknown) {
        errorHandler(message, err, logger);
    }
};

export default messageHandlers;
