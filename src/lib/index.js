import axios from "axios"
import { toast } from "svelte-sonner"
import firebase from "firebase/compat/app";
import "firebase/firestore";
import { handleResposeMessages,  loading, isLoggin } from "$lib/store/activities";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { fb } from "$lib/auth/firebaseConfig"
import { user } from "$lib/store/profile";
import { changeotp } from "$lib/store/routes";
import { browser } from '$app/environment';
import { handleAuthToken } from "$lib/store/routes";
import { coin_list, default_Wallet } from "$lib/store/coins";
import { goto } from "$app/navigation";
import { AUTH_Script } from "./auth/hook";
import { serverUrl } from "../lib/backendUrl"
import { loadapp } from '../lib/store/app';

const handleAuthHeader = (()=>{
    let auth;
    handleAuthToken.subscribe((token) => {
        auth = token
    })
    return auth
})


export class App_script{
    constructor(){
        this.url = null
        this.isLogin = false
        this.secret = ""
        this.user = {}
    }
    serverUrl(url){
        this.url = url
        this.auth = new AUTH_Script(this.url)
    }
    async profile(secret){
        this.secret = secret
        handleAuthToken.set(secret)
        const path = "/api/profile/user"
        await axios.get(this.url + path,{
            headers: {
                Authorization: `bearer ` + secret 
            }
        })
        .then((res)=>{
            let response = res.data
            this.isLogin = true
            user.set(response?.user)
            let wallet = response?.wallet
            coin_list.set(wallet)
            wallet.forEach(element => {
                if(element.is_active){
                    default_Wallet.set(element)
                }
            });
            isLoggin.set(this.isLogin)
        })
        .catch((err)=>{
            // toast.error(err.response?.data)
        })
        loadapp.set(false)
    }
    async handleUserProfile(id){
        let respose = ""
        await axios.get(`${this.url}/api/profile/user-id/${id}`)
        .then((res)=>{
            respose = res.data
        })
        .catch((err)=>{
            handleResposeMessages("error", err.response?.data)
        })
        return respose
    }
    async handleKYCverification1(data){
        let response = ""
        await axios.post(`${this.url}/api/profile/kyc-step1`,{
            auth: data
        },{
            headers: {
                Authorization: `Bearer ${this.secret}`
            }
        })
        .then((res)=>{
            user.set(res.data)
            handleResposeMessages("success","Level 1 submitted successfully")
        })
        .catch((err)=> {
            handleResposeMessages("error",err.response?.data)
        })
        return response
    }
    
async handleChangeUsername(data, auth){
    let response = ""
    await axios.post(`${this.url}/api/profile/username`,{
        username: data
    },{
        headers: {
            Authorization: `Bearer ${this.secret}`
        }
    })
    .then((res)=>{
        response = res.data
        user.set(response)
        handleResposeMessages("success","Username updated successfully")
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
    })
    return response
}

async handleChangeProfilePrivacy(data,){
    let response = ""
    await axios.post(`${this.url}/api/profile/privacy`,{
        private: data
    },{
        headers: {
            Authorization: `Bearer ${this.secret}`
        }
    })
    .then((res)=>{
        response = res.data
        handleResposeMessages("success","Your profile visibility is updated")
        user.set(response)
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
    })
    return response
}

async handleLinkEmail(data){
    let response = ""
    await axios.post(`${this.url}/api/profile/link-email`,{
        email: data
    },{
        headers: {
            Authorization: `Bearer ${this.secret}`
        }
    })
    .then((res)=>{
        response = res.data
        user.set(response)
        handleResposeMessages("success","Your email is linked to google successfully")
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
        location.href = "/"
    })
    return response
}

async handleCreateOtp(){
    let response = ""
    await axios.get(`${this.url}/api/profile/create-otp`,{
        headers: {
            Authorization: `Bearer ${this.secret}`
        }
    })
    .then((res)=>{
        response = res.data
        handleResposeMessages("success","Check your email for the one-time password")
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
    })
    return response
}


async handleVerifyEmail(code, token){
    loading.set(true)
    let response = ""
    await axios.post(`${this.url}/api/profile/verify-email`,{
        code, token
    },{
        headers: {
            Authorization: `Bearer ${this.secret}`
        }
    })
    .then((res)=>{
        response = res.data
        user.set(response)
        handleResposeMessages("success","Your email is verified successfully")
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
    })
    return response
}
async handleGoogleLink (authi){
    let response = "";
    loading.set(true);
    const auth = getAuth(fb);
    await signInWithPopup(auth, new GoogleAuthProvider())
    .then(async(res)=>{
        response = await this.handleLinkEmail(res.user?.email)
    })
    .catch((err)=>{
        handleResposeMessages("error",err.code.slice(5))
    })
    return response
}
async handleChangePassword (pass,id){
    let response = ""
    let isLoading = true
    await axios.get(`${this.url}/auth/password/${id}`,{
        password:pass
    })
    .then((res)=>{
        response = res.data
        isLoading = false
        handleResposeMessages("success","Password changed")
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
        isLoading = false
    })
    return {response, isLoading}
}

async handleChangeEmailOtp(id, data){
    let response = ""
    let isLoading = true
    await axios.post(`${this.url}/auth/email-top/${id}`,{
        emails: data
    })
    .then((res)=>{
        response = res.data
        isLoading = false
        browser &&  sessionStorage.setItem('change-email', JSON.stringify(response));
        handleResposeMessages("success","Code is sent to your old email")
        changeotp.set(response)
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
        isLoading = false
    })
    return {isLoading, response}
}

async handleChangeEmail(id, data){
    let response = ""
    let isLoading = true
    await axios.post(`${this.url}/auth/email/${id}`,{
        data
    })
    .then((res)=>{
        response = res.data
        isLoading = false
        user.set(response)
        browser && sessionStorage.removeItem("change-email");
        changeotp.set("")
        handleResposeMessages("success","Email changed successfully")
        setTimeout(()=>{
            handleResposeMessages("success","Verify your new Email")
            goto("/verification")
        },20000)
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
        isLoading = false
    })
    return {isLoading, response}
}

async handleFetchLoginType(){
    let response = ""
    loading.set(true)
    await axios.get(`${this.url}/api/profile/fetch-loginType`,{
        headers:{
            Authorization: `Bearer ${this.secret}`
        }
    })
    .then((res)=>{
        response = res.data
         loading.set(false)
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
         loading.set(false)
    })
    return response
}

async handleGenerateSecrete(email){
    let response = ""
    loading.set(true)
    await axios.get(`${this.url}/auth/generate-secret/${email}`)
    .then((res)=>{
        response = res.data
         loading.set(false)
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
         loading.set(false)
    })
    return response
}


async handleverifyFA_Token({token, secret}, id){
    let response = ""
    loading.set(true)
    await axios.post(`${this.url}/auth/verify-token/${id}`,{
        token, secret 
    })
    .then((res)=>{
        response = res.data
         loading.set(false)
         handleResposeMessages("success","Two factor Authentication Enabled")
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
        loading.set(false)
    })
    return response
}

async handleDeleteAuthentication (token, id){
    let response = ""
    loading.set(true)
    await axios.post(`${this.url}/auth/delete-token/${id}`,{
         token
    })
    .then((res)=>{
        response = res.data
         loading.set(false)
         handleResposeMessages("success","Two factor Authentication Disabled")
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
         loading.set(false)
    })
    return response
}

async handleChangeProflePicture (image){
    let response = ""
    let error ;
    loading.set(true)
    await axios.post(`${this.url}/api/profile/change-profile-img`,{
        image
    },{
        headers:{
            Authorization: `Bearer ${this.secret}`
        }
    })
    .then((res)=>{
        response = res.data
         handleResposeMessages("success","Profile Picture changed")
         loading.set(false)
    })
    .catch((err)=>{
        console.log(err)
        error = err.response
        loading.set(false)
        handleResposeMessages("error", err.response?.data)
    })
    return {response, error}
}

async fetchVistorsDevice (){
    let response = ""
    await axios.get(`https://ipinfo.io/json?token=0d65c9c7910c63`)
    .then((res)=>{
        response = res.data
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
    })
    return response
}

async createRefCode ( code){
    let response = ""
    let load = true
    await axios.post(`${this.url}/api/profile/create-referralcode`,{
        code 
    },{
        headers: {
            Authorization: `Bearer ${this.secret}`
        }
    })
    .then((res)=>{
        response = res.data
        handleResposeMessages("success","Referral code created")
        load = false
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
        load = false
    })
    return {response, load}
}

async referralCode (){
    let response = ""
    await axios.get(`${this.url}/api/profile/referralcode`,{
        headers: {
            Authorization: `Bearer ${this.secret}`
        }
    })
    .then((res)=>{
        response = res.data
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
    })
    return response
}

async regsterReferralCode ( code){
    let response = ""
    await axios.post(`${this.url}/api/profile/register-referralcode`,{
        code
    },{
        headers: {
            Authorization: `Bearer ${this.secret}`
        }
    })
    .then((res)=>{
        response = res.data
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
    })
    return response
}

async fetchSumsub(){
    let response = ""
    await axios.get(`${this.url}/api/profile/fetch-token`,{
        headers: {
            Authorization: `Bearer ${this.secret}`
        }
    })
    .then((res)=>{
        response = res.data
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
    })
    return response
}

async updateVerifiedStatus (status){
    let response = ""
    await axios.post(`${this.url}/api/profile/update-verify`,{
        status
    },{
        headers: {
            Authorization: `Bearer ${this.secret}`
        }
    })
    .then((res)=>{
        response = res.data
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
    })
    return response
}

async handleEMailChange ( emails){
    let response = ""
    let isLoading = true
    await axios.post(`${this.url}/api/profile/check-email`,{
        emails
    },{
        headers: {
            Authorization: `Bearer ${this.secret}`
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
}

async handleChangeDefaultWallet ( data){
    let response = ""
    let isLoading = true
    if(data.coin_name === "Cyclix Points"){
        isLoading = false
        handleResposeMessages("error", "Wallet is view only, Select other wallet")
        return {response, isLoading}
    }
    await axios.post(`${this.url}/api/profile/change-defaultwallet`,{
        data
    },
    {
    headers: {
        Authorization: `Bearer ${this.secret}`
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
}



}

export async function fetchWallet (event){
    let response = ""
    let isLoading = true
    await axios.get(`${serverUrl()}/api/profile/wallet/${event}`,{
        headers: {
          Authorization: `Bearer ${handleAuthHeader()}`
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
    return response
}