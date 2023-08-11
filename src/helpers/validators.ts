import { Message } from "discord.js"
import { getDetails } from "./inputHelpers";

const isUsableMessage = (message: Message): boolean => Boolean(message.member && message.guild && message.guildId);

const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
const isValidUrl = (message: Message): boolean => {
    const messageDetails = getDetails(message);
    return youtubeRegex.test(messageDetails);
}

const isValidPlayMessage = (message: Message): boolean => {
    return isUsableMessage(message) && isValidUrl(message)
}


export { isValidPlayMessage }