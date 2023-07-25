import { Message } from "discord.js";
import { Logger } from "pino";
import player from "../../../lib/Player";
import { Metadata } from "../../../../@types/internal";

const getQueue = (message: Message, logger: Logger): void => {
    logger.info({ msg: 'Handling Get Queue' });
    const queue = player.getQueue();
    const outputString = generateOutputString(queue);
    message.reply(outputString);
}

const generateOutputString = (queue: Metadata[]): string => {
    let messageString = `The current playing queue is \n`;
    let counter = 1;
    for(const item of queue) {
        messageString += `${counter}. ${item.title} - ${item.url}\n`;
        counter += 1;
    }

    return messageString;
}

export { getQueue }