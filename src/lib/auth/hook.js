import axios from "axios";
import { toast } from "svelte-sonner"
import firebase from "firebase/compat/app";
import "firebase/firestore";
import { serverUrl } from "$lib/backendUrl";
import { handleResposeMessages,  loading } from "$lib/store/activities";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { fb } from "./firebaseConfig"
import { deleteCookie, setCookie } from "../store/cookies";


export class AUTH_Script{
    constructor(url){
        this.url = url
        this.status = ""
    }
    async login(data){
        await axios.post(`${this.url}/auth/login`,{
            auth: data
        })
        .then((res)=>{
            setCookie("secret", res.data?.token)
            toast.success("Welcome back")
            this.status = "success"
        })
        .catch((err)=> {
            toast.error(err.response?.data)
            this.status = "failed"
        })
        return {status:this.status}
    }
    async signup(data){
        await axios.post(`${this.url}/auth/signup`,{
            auth: data
        })
        .then((res)=>{
            setCookie("secret", res.data?.token)
            toast.success("Registered successfully")
            this.status = "success"
        })
        .catch((err)=> {
            toast.error(err.response?.data)
            this.status = "failed"
        })
        return {status:this.status}
    }
    async handleGoogleAuthentication(data){
        let response = null
        await axios.post(`${this.url}/auth/google`,{
            auth: data
        })
        .then((res)=>{
            response = res.data?.token
        })
        .catch((err)=> {
            toast.error(err.response?.data)
        })
        return response
    }
    
    async handleGoogleAuth(device){
        const auth = getAuth(fb);
        await signInWithPopup(auth, new GoogleAuthProvider())
        .then(async(res)=>{
            let user = res?.user
            let _response = await this.handleGoogleAuthentication({...user, device})
            setCookie("secret", _response)
            toast.success("Logged In successful")
            this.status = "success"
        })
        .catch((err)=>{
            toast.error(err.code.slice(5))
            this.status = "failed"
        })
        return {status:this.status}
    }
    logout(){
        deleteCookie("secret")
    }
}


export const handleSetGooglePassword = (async(auth, id)=>{
    loading.set(true)
    let response = ""
    await axios.post(`${serverUrl()}/auth/set-password/${id}`,{
        auth
    })
    .then((res)=>{
        response = res.data
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
    })
    return response
})

export const handleCreateNewPassword = (async(auth, id)=>{
    loading.set(true)
    let response = ""
    await axios.post(`${serverUrl()}/auth/create-password/${id}`,{
        auth
    })
    .then((res)=>{
        response = res.data
        handleResposeMessages("success","New password created successfully")
        setTimeout(()=>{
            handleIsLogout()
        },3000)
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
    })
    return response
})

export const handlePasswordValidation = (async(auth, data)=>{
    let response = ""
    let isLoading = true
    await axios.post(`${serverUrl()}/api/profile/verify-password`,{
        auth: data
    },
    {
    headers: {
        Authorization: `Bearer ${auth}`
    }
    })
    .then((res)=>{
        response = res.data
        isLoading = false
    })
    .catch((err)=>{
        isLoading = false
        handleResposeMessages("error", err.response?.data)
    })
    return {response, isLoading}
})

export const handlePasswordChange = (async(auth, data)=>{
    let response = ""
    let isLoading = true
    await axios.post(`${serverUrl()}/api/profile/change-password`,{
        auth: data
    },{
    headers: {
        Authorization: `Bearer ${auth}`
    }
    })
    .then((res)=>{
        response = res.data
        isLoading = false
        handleResposeMessages("success","New password set successfully")
    })
    .catch((err)=>{
        isLoading = false
        handleResposeMessages("error", err.response?.data)
    })
    return {response, isLoading}
})

export const handleRequestForgetPassword = (async(data)=>{
    let response = ""
    let isLoading = true
    await axios.post(`${serverUrl()}/auth/request-forget-password`,{
        email: data
    })
    .then((res)=>{
        response = res.data
        isLoading = false
        handleResposeMessages("success", "Enter code from your email.")
    })
    .catch((err)=>{
        isLoading = false
        handleResposeMessages("error", err.response?.data)
    })
    return {response, isLoading}
})

export const handleResetPassword = (async(data)=>{
    let response = ""
    let isLoading = true
    await axios.post(`${serverUrl()}/auth/reset-password`,{
        auth: data
    })
    .then((res)=>{
        response = res.data
        isLoading = false
        handleResposeMessages("success", "You successfully reset your password.")
    })
    .catch((err)=>{
        isLoading = false
        handleResposeMessages("error", err.response?.data)
    })
    return {response, isLoading}
})