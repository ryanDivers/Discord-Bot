import { Message } from 'discord.js';
import { Logger } from 'pino';

const helpMessage = `
    !ping       - ping command
    !play <url> - play/add track to play queue
    !queue      - get current play queue
    !clear      - clear current queue
    !skip       - skip current track
    !pause      - pause current track
    !unpause    - unpause current track
    !stop       - stop current track
`;

const help = (message: Message, logger: Logger): void => {
    logger.info({ msg: 'Handling Help Command' });
    message.reply(helpMessage);
};

export { help };
