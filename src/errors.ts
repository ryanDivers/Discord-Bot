/* eslint-disable max-classes-per-file */
import { Message } from 'discord.js';

class ReplyError extends Error {
    public replyMessage: string;

    constructor(replyMessage: string) {
        super();
        this.replyMessage = replyMessage;
        this.message = 'ReplyError';
    }
}

const isReplyError = (
    err: unknown,
): err is ReplyError => err instanceof ReplyError;

const sendErrorMessage = (message: Message, err: unknown): void => {
    if (isReplyError(err)) {
        message.reply(err.replyMessage);
    } else {
        message.reply('Unexpected Error');
    }
};

export {
    ReplyError,
    sendErrorMessage,
};
