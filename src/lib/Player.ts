import {
    AudioPlayer,
    AudioPlayerStatus,
    CreateVoiceConnectionOptions,
    JoinVoiceChannelOptions,
    VoiceConnection,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
} from '@discordjs/voice';
import ytdl from 'ytdl-core';
import { InternalDiscordGatewayAdapterCreator } from 'discord.js';
import { logger } from '../Logger';
import { Metadata } from '../../@types/internal';
import { VoiceChannelConfigNotSetError } from '../errors';

class Player {
    private isPlaying: boolean = false;

    private playQueue: Metadata[] = [];

    private player!: AudioPlayer;

    // eslint-disable-next-line max-len
    private voiceChannelConfig: (CreateVoiceConnectionOptions & JoinVoiceChannelOptions) | undefined;

    constructor() {
        this.createPlayer();
    }

    private play() {
        const metadata = this.playQueue.shift();
        if (metadata) {
            logger.info({ msg: 'Playing next song in queue' });
            const stream = ytdl(metadata.url, { filter: 'audioonly' });
            this.subscribeToChannel();
            const resource = createAudioResource(stream);
            this.player.play(resource);
            this.isPlaying = true;
        }
    }

    async addToQueue(url: string) {
        logger.info({ msg: 'Adding new song to queue' });

        const metadata = await ytdl.getInfo(url);
        this.playQueue.push({
            url: metadata.videoDetails.video_url,
            title: metadata.videoDetails.title,
            duration: metadata.videoDetails.lengthSeconds,
            author: metadata.videoDetails.author.name,
        });

        if (!this.isPlaying) {
            this.play();
        }
    }

    async forcePlay(url: string) {
        logger.info({ msg: 'Force playing song' });

        const metadata = await ytdl.getInfo(url);
        this.playQueue.unshift({
            url: metadata.videoDetails.video_url,
            title: metadata.videoDetails.title,
            duration: metadata.videoDetails.lengthSeconds,
            author: metadata.videoDetails.author.name,
        });

        this.skipSong();
    }

    setChannelConfig(
        channelId: string,
        guildId: string,
        adapterCreator: InternalDiscordGatewayAdapterCreator,
    ): void {
        this.voiceChannelConfig = {
            channelId,
            guildId,
            adapterCreator,
        };
    }

    private joinChannel(): VoiceConnection {
        if (this.voiceChannelConfig) {
            return joinVoiceChannel(this.voiceChannelConfig);
        }
        throw new VoiceChannelConfigNotSetError();
    }

    subscribeToChannel(): void {
        logger.info({ msg: 'Joining Voice Channel' });
        const connection = this.joinChannel();
        logger.info({ msg: 'Subscribing Player to Voice Connection' });
        connection.subscribe(this.player);
    }

    getQueue() {
        return this.playQueue;
    }

    returnInstance() {
        return this.player;
    }

    clearQueue() {
        this.playQueue = [];
    }

    skipSong() {
        this.player.stop();
        this.play();
    }

    pause() {
        this.player.pause();
    }

    unpause() {
        this.player.unpause();
    }

    stop() {
        this.player.stop();
    }

    private createPlayer() {
        this.player = createAudioPlayer();
        logger.info({ msg: 'Creating Audio Player' });
        this.player.on('error', this.errorHandler);
        this.player.on(AudioPlayerStatus.Idle, this.idleHandler);
    }

    private recreatePlayer() {
        this.createPlayer();
        this.play();
    }

    private idleHandler = () => {
        this.isPlaying = false;
        this.play();
        if (!this.isPlaying) {
            logger.info({ msg: 'Player is idle' });
        }
    };

    private errorHandler = (err: unknown) => {
        logger.error({ msg: 'Player Error', err });
        this.recreatePlayer();
    };
}

const player = new Player();

export default player;
