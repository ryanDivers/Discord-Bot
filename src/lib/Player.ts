import {
    AudioPlayer,
    AudioPlayerStatus,
    createAudioPlayer,
    createAudioResource,
} from "@discordjs/voice";
import ytdl from "ytdl-core";
import { logger } from "../Logger";
import { Metadata } from "../../@types/internal";

class Player {
    private isPlaying: boolean = false;

    private simplePlayQueue: Metadata[] = []

    private player: AudioPlayer;


    constructor() {
        this.player = createAudioPlayer();
        logger.info({ msg: 'Creating Audio Player' });
        this.player.on('error', this.errorHandler);
        this.player.on(AudioPlayerStatus.Idle, this.idleHandler);
    }

    private play() {
        const metadata = this.simplePlayQueue.shift();
        if (metadata) {
            const stream = ytdl(metadata.url, { filter: 'audioonly' });
            const resource = createAudioResource(stream);
            this.player.play(resource);
            this.isPlaying = true;
        }
    }

    async addToQueue(url: string) {
        const metadata = await ytdl.getInfo(url);

        this.simplePlayQueue.push({
            url: metadata.videoDetails.video_url,
            title: metadata.videoDetails.title,
            duration: metadata.videoDetails.lengthSeconds,
            author: metadata.videoDetails.author.name,
        });

        if (!this.isPlaying) {
            this.play();
        }
    }



    getQueue() {
        return this.simplePlayQueue
    }

    returnInstance() {
        return this.player;
    }

    private recreatePlayer() {
        this.player = createAudioPlayer();
        this.play()
    }

    private idleHandler = () => {
        this.isPlaying = false;
        this.play()
        if (!this.isPlaying) {
            logger.info({ msg: 'Player is idle' });
        }   
    }

    private errorHandler = (err: unknown) => {
        logger.error({ msg: 'Player Error', err });
        this.recreatePlayer();
    }

};

const player = new Player();

export default player;