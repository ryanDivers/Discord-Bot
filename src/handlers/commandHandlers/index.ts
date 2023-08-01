import { Message } from "discord.js";
import { Logger } from "pino";
import { helpCommand } from "./help";
import { pingCommand } from "./ping";
import { clearQueue } from "./sound/clear";
import { getQueue } from "./sound/getQueue";
import { playSound } from "./sound/playSound";
import { skipSong } from "./sound/skip";


const messageEvents: Record<string, (message: Message, logger: Logger) => void | Promise<void>> = {
    'ping': pingCommand,
    'help': helpCommand,
    'sound': playSound,
    'queue': getQueue,
    'clear': clearQueue,
    'skip': skipSong,
};

export default messageEvents;