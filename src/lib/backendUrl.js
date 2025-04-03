import { browser } from '$app/environment'

export const serverUrl = () => {
  if(browser){
    let url = location.hostname === "localhost" || location.hostname === "127.0.0.1" 
    ? "http://localhost:8000" : "https://rx-casino.onrender.com"
     return url
  }
}

export const clientUrl = () => {
  if(browser){
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
      return "http://localhost:5173";
    }else{
      return "https://rx-casino.netlify.app";
    }
  }
}
