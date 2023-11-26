/* eslint-disable quote-props */
import { Message } from 'discord.js';
import { Logger } from 'pino';
import { help } from './help';
import { ping } from './ping';
import { clearQueue } from './sound/clear';
import { getQueue } from './sound/getQueue';
import { play, forcePlay } from './sound/play';
import { skipSong } from './sound/skip';
import { pause, unpause } from './sound/pause';
import { stop } from './sound/stop';

// eslint-disable-next-line no-unused-vars
const messageEvents: Record<string, (message: Message, logger: Logger) => void | Promise<void>> = {
    'ping': ping,
    'help': help,
    'play': play,
    'force-play': forcePlay,
    'queue': getQueue,
    'clear': clearQueue,
    'skip': skipSong,
    'pause': pause,
    'unpause': unpause,
    'stop': stop,
};

export default messageEvents;
