import { Message } from "discord.js";
import { isMessageForBot, getCommand } from "../helpers/inputHelpers";
import messageEvents from "./commandHandlers";
import { defaultCommand } from "./commandHandlers/default";

const messageHandlers = (message: Message): void => {
    if (!isMessageForBot(message)) return;
    const command = getCommand(message);

    const eventHandler = messageEvents[command];
    if (!eventHandler) {
        return defaultCommand(message);
    }

    eventHandler(message);
};

export default messageHandlers;