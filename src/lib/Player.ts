import { AudioPlayer, AudioPlayerStatus, AudioResource, createAudioPlayer } from "@discordjs/voice";
import { logger } from "../Logger";

class Player {
    private isPlaying: boolean = false;

    private playQueue: AudioResource[] = [];

    private player: AudioPlayer;


    constructor() {
        this.player = createAudioPlayer();
        logger.info({ msg: 'Creating Audio Player' });
        this.player.on('error', this.errorHandler);
        this.player.on(AudioPlayerStatus.Idle, this.idleHandler);
    }

    play(resource: AudioResource) {
        console.log(this.isPlaying);
        if (this.isPlaying) {
            logger.info({ msg: 'Adding item to play queue' });
            this.playQueue.push(resource);
            console.log(this.playQueue);
            return;
        }
        
        this.player.play(resource);
        this.isPlaying = true;
    }

    returnInstance() {
        return this.player;
    }

    private recreatePlayer() {
        this.player = createAudioPlayer();
    }

    private idleHandler = () => {
        this.isPlaying = false;
        const resource = this.playQueue.shift();
        if (resource) {
            this.play(resource);
            return;
        }
        
        logger.info({ msg: 'Player is idle' });
        
    }

    private errorHandler = (err: unknown) => {
        logger.error({ msg: 'Player Error', err });
        this.recreatePlayer();
    }

};

export default Player;