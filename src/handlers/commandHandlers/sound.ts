import { createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import { Message } from "discord.js";

const playSound = (message: Message): void => {
    const player = createAudioPlayer();
    const resource = createAudioResource('/Users/ryandivers/Documents/GitHub/Discord-Bot/assets/sound/test.mp3');

    player.play(resource);

    const connection = joinVoiceChannel({
        channelId: message.member?.voice.channelId as any,
        guildId: message.guildId as any,
        adapterCreator: message.guild?.voiceAdapterCreator as any,
    });

    const subscription = connection.subscribe(player);

    if (subscription) {
        setTimeout(() => subscription.unsubscribe(), 15_0000);
    }
}

export { playSound };