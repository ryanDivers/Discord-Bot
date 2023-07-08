import { Message } from "discord.js";
import { Logger, pino } from "pino";

const logger = pino({ base: undefined });

const getEventScopedLogger = (message: Message): Logger => {
    const childLogger = logger.child({
        username: message.author.username,
        content: message.content,
    });
    return childLogger;
}

export { logger, getEventScopedLogger };