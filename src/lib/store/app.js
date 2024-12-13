import { writable } from "svelte/store";
let _app = null
export const app = writable(_app)

let _loadapp = true
export const loadapp = writable(_loadapp)
