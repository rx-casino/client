import { MinesGame, GameActions } from "$lib/games/mines-game/mines.hook.js";
import { mines, soundManager } from "$lib/games/mines-game/mines.store.js";

export async function load() {
    const _mines = new MinesGame()
    const actions = new GameActions()
    _mines.connect()
    let io = _mines.io
    io.on("gameInfo", data =>{
        _mines.getGameInfo(data)
    })
    mines.set(_mines)
    soundManager.set(actions)
}