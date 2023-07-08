import { Message } from "discord.js";
import { MESSAGE_PREFIX } from "../config";
import { AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";

const isMessageForBot = (message: Message) : boolean => !message.author.bot && message.content.startsWith(MESSAGE_PREFIX);
const getCommand = (message: Message) : string => {
    const commandBody = message.content.slice(MESSAGE_PREFIX.length);
    const command = commandBody.split(' ')[0];
    return command.toLowerCase();
}

const newMessageHandler = (message: Message) : void => {
    if (!isMessageForBot(message)) return;
    const command = getCommand(message);

    switch (command) {
        case 'ping':
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
            return;
        case 'help':
            message.reply('Help is not configured yet');
            return;
        case 'sound':
            playSound(message);
            return
        default:
            message.reply('Unknown Command');
            return;
    }
};

const playSound = async (message: Message) : Promise<void> => {
    console.log(message.member?.voice.channelId);
    console.log(message.guildId);
    

    const player = createAudioPlayer();

    player.on(AudioPlayerStatus.Playing, () => {
        console.log('Player is playing');
    });

    player.on('error', (err) => {
        console.log(err);
    });

    const resource = createAudioResource('/Users/ryandivers/Documents/GitHub/Discord-Bot/assets/sound/test.mp3');
    player.play(resource);

    const connection = joinVoiceChannel({
        channelId: message.member?.voice.channelId as any,
        guildId: message.guildId as any,
        adapterCreator: message.guild?.voiceAdapterCreator as any, 
     });

    console.log('Connection to voice channel done');
    const subscription = connection.subscribe(player);

     if (subscription) {
        setTimeout(() => subscription.unsubscribe(), 15_000);
     }

    return;
}

export { newMessageHandler };