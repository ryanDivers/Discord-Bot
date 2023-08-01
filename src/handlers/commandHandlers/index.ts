import { Message } from "discord.js";
import { Logger } from "pino";
import { helpCommand } from "./help";
import { pingCommand } from "./ping";
import { clearQueue } from "./sound/clear";
import { getQueue } from "./sound/getQueue";
import { playSound } from "./sound/playSound";
import { skipSong } from "./sound/skip";
import { pause, unpause } from "./sound/pause";
import { stop } from "./sound/stop";


const messageEvents: Record<string, (message: Message, logger: Logger) => void | Promise<void>> = {
    'ping': pingCommand,
    'help': helpCommand,
    'sound': playSound,
    'queue': getQueue,
    'clear': clearQueue,
    'skip': skipSong,
    'pause': pause,
    'unpause': unpause,
    'stop': stop,
};

export default messageEvents;