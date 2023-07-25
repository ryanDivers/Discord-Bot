import { helpCommand } from "./help";
import { pingCommand } from "./ping";
import { getQueue } from "./sound/getQueue";
import { playSound } from "./sound/playSound";

const messageEvents: Record<string, Function> = {
    'ping': pingCommand,
    'help': helpCommand,
    'sound': playSound,
    'queue': getQueue,
};

export default messageEvents;