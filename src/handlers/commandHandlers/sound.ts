import { createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import { Message } from "discord.js";
import { Logger } from "pino";
import ytdl from "ytdl-core";
import { getDetails } from "../../helpers/inputHelpers";
import Player from "../../lib/Player";

const player = new Player();

const playSound = (message: Message, logger: Logger): void => {
    logger.info({ msg: 'Handling Sound Command'});

    const url = getDetails(message);
    const stream = ytdl(url, { filter: 'audioonly'});

    const resource = createAudioResource(stream);

    player.play(resource);

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