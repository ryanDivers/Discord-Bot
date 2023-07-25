import { createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import { Message } from "discord.js";
import { Logger } from "pino";
import ytdl from "ytdl-core";
import { getDetails } from "../../../helpers/inputHelpers";
import player from "../../../lib/Player";


const playSound = async (message: Message, logger: Logger): Promise<void> => {
    logger.info({ msg: 'Handling Sound Command'});

    const url = getDetails(message);
    await player.addToQueue(url);

    if (!message.member || !message.guild || !message.guildId) {
        logger.warn({ msg: 'Message not in useable format'});
        return;
    }

    logger.info({ msg: 'Joining Voice Channel'});
    const connection = joinVoiceChannel({
        channelId: message.member.voice.channelId || '',
        guildId: message.guildId,
        adapterCreator: message.guild.voiceAdapterCreator,
    });

    logger.info({ msg: 'Subscribing player to Voice Channel'})
    const subscription = connection.subscribe(player.returnInstance());

    if (subscription) {
        logger.info({ msg: 'Playing Audio'});
    }
}

export { playSound };