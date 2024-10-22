import { io } from "socket.io-client";
import axios from "axios"
import { serverUrl } from "$lib/backendUrl";
import { publicChat } from "$lib/store/profile";
import { dicegameplays } from "$lib/games/ClassicDice/store/index";

const URL = serverUrl()
const socket = io(`${URL}`);

export const handleSocketConnection = (async()=>{
    socket.on("dice-gamePLayers", data => {
        dicegameplays.set(data)
    })
    socket.on("chats", data => {
        publicChat.set(data)
    })
    socket.on("default-chat", data => {
        publicChat.set(data)
    })
    const handlePublicChat = (async(data)=>{
        socket.emit("public-chat", data)
    })
    const handleDicebet = (async(data)=>{
        socket.emit("dice-game", data)
    })
    const handleFetchPublicChat = (async(data)=>{
        socket.emit("fetch-defult")
    })
    return {handlePublicChat, handleDicebet, handleFetchPublicChat}
})