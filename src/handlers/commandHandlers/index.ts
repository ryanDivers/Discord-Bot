import { helpCommand } from "./help";
import { pingCommand } from "./ping";
import { playSound } from "./sound";

const messageEvents: Record<string, Function> = {
    'ping': pingCommand,
    'help': helpCommand,
    'sound': playSound,
};

export default messageEvents;