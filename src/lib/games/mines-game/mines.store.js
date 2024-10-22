import { writable} from "svelte/store"

let _mine = {}
export let mines = writable(_mine)

let _sound = {}
export let soundManager = writable(_sound)
