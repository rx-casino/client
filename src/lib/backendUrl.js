import { browser } from '$app/environment'

export const serverUrl = () => {
  if(browser){
    let url = location.hostname === "localhost" || location.hostname === "127.0.0.1" 
    ? "http://localhost:8000" : "https://cat3poker-d07112c3d84c.herokuapp.com"
     return url
  }
}

export const clientUrl = () => {
  if(browser){
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
      return "http://localhost:5173";
    }else{
      return "https://playtrickygames.netlify.app";
    }
  }
}
