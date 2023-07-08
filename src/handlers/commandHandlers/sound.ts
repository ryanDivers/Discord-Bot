import { createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import { Message } from "discord.js";
import { join } from 'path';
import { Logger } from "pino";

const playSound = (message: Message, logger: Logger): void => {
    logger.info({ msg: 'Handling Sound Command'});
    const player = createAudioPlayer();
    const resource = createAudioResource(join(__dirname, '../../../../assets/sound/test.mp3'));

    player.play(resource);
    player.on('error', (err) => {
        logger.error({ msg: 'Player Error', err });
    });

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
    const subscription = connection.subscribe(player);

    if (subscription) {
        logger.info({ msg: 'Playing Audio'});
        setTimeout(() => subscription.unsubscribe(), 15_0000);
    }
}

export { playSound };