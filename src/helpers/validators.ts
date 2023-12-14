import { Message, GuildMember, Guild } from 'discord.js';
import { getDetails } from './inputHelpers';

interface MessageWithField extends Message {
    member: GuildMember,
    guild: Guild,
    guildId: string
}

const isUsableMessage = (message: Message): boolean => Boolean(
    message.member && message.guild && message.guildId,
);

const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
const isValidUrl = (message: Message): boolean => {
    const messageDetails = getDetails(message);
    return youtubeRegex.test(messageDetails);
};

// eslint-disable-next-line max-len
const isValidPlayMessage = (message: Message): message is MessageWithField => isUsableMessage(message) && isValidUrl(message);

export { isValidPlayMessage, MessageWithField };
