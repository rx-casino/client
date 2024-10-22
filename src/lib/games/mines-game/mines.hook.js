import { io } from "socket.io-client";
import axios from "axios"
import { serverUrl } from "$lib/backendUrl";

const URL = serverUrl()
const socket = io(`${URL}`);

export class MinesGame{
    constructor(){
        this.mines = []
        this.io = socket
        this.url = URL
    }
    connect(){
        this.io.emit("mines-connect")
    }
    getGameInfo(id){
        this.mines = id
    }
}

export class GameActions{
    constructor(){
        this.audio = {
            bgSound: {
                path: "assets/mine/audio/sound_bg.663fffac.mp3"
            },
            win: {
                path: "assets/mine/audio/win.1981b036.mp3"
            },
            hover: {
                path: "assets/mine/audio/sound_hover.61e50321.mp3"
            },
            gems: {
                path: "assets/mine/audio/sound_gems.08dbc6e7.mp3"
            },
            mine: {
                path: "assets/mine/audio/sound_mines.50ef3b60.mp3"
            },
            bet: {
                path: "assets/mine/audio/sound_bet.42530855.mp3"
            }
        }
        this.music = false
        this.sound = false
    }
    playBg(){
        const audio = new Audio(this.audio["bgSound"].path);
        audio.loop
        audio.pause();
        audio.volume = 1;
        audio.play();
    }
}