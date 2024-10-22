import { toast } from 'svelte-sonner'
import { writable} from "svelte/store"

let _error = null
export let error = writable(_error)

let _auth = null
export let auth = writable(_auth)

let _message = []

export let message = writable(_message)

let _loading = false
export let loading = writable(_loading)

let _isLoggin = false
export let isLoggin = writable(_isLoggin)

let _isLiveStat = false
export let isLiveStat = writable(_isLiveStat)

export const handleResposeMessages = ((type, res)=>{
    if(type === "error"){
        toast.error(res)
    }
    else{
        toast.success(res)
    }
})