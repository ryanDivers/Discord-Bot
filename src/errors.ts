/* eslint-disable max-classes-per-file */
class ReplyError extends Error {
    public replyMessage: string;

    constructor(replyMessage: string) {
        super();
        this.replyMessage = replyMessage;
        this.message = 'ReplyError';
    }
}

class VoiceChannelConfigNotSetError extends Error {
    constructor() {
        const message = 'VoiceChannelConfig Undefined';
        super(message);
        this.message = message;
        this.name = 'VoiceChannelConfigNotSetError';
    }
}

export {
    ReplyError,
    VoiceChannelConfigNotSetError,
};
