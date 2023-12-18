class ReplyError extends Error {
    public replyMessage: string;

    constructor(replyMessage: string) {
        super();
        this.replyMessage = replyMessage;
        this.message = 'ReplyError';
    }
}

export {
    ReplyError,
};
