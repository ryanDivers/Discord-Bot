import { Message } from 'discord.js';
import { isMessageForBot, getCommand } from '../helpers/inputHelpers';
import messageEvents from './commandHandlers';
import { defaultCommand } from './commandHandlers/default';
import { getEventScopedLogger } from '../Logger';

const messageHandlers = (message: Message): void => {
    const logger = getEventScopedLogger(message);

    if (!isMessageForBot(message)) return;
    const command = getCommand(message);

    const eventHandler = messageEvents[command];
    if (!eventHandler) {
        // eslint-disable-next-line consistent-return
        return defaultCommand(message, logger);
    }

    eventHandler(message, logger);
};

export default messageHandlers;
