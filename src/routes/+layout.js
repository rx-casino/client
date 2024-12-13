import { browser } from '$app/environment'
import { routes, otp} from "$lib/store/routes";
import { changeotp } from "$lib/store/routes";
import { App_script } from '../lib';
import { getCookie } from '../lib/store/cookies';
import { app, loadapp } from '../lib/store/app';
import { serverUrl } from "../lib/backendUrl"

/** @type {import('./$types').PageLoad} */

export async function load({ route }) {
  const _app = new App_script()
  const _url = serverUrl()
  _app.serverUrl(_url)
  if(browser){
    const _user = getCookie("secret")
    if(_user){
      _app.profile(_user)
    }else{
      loadapp.set(false)
    }
  }
  app.set(_app)

  let password = browser && JSON.parse(sessionStorage.getItem('password'));
  let fach = browser && JSON.parse(sessionStorage.getItem('otp'));
  const user = browser && JSON.parse(localStorage.getItem('drr'))
  const changeEmail = browser && JSON.parse(sessionStorage.getItem('change-email'))

  changeotp.set(changeEmail)
  routes.set(route.id)
  otp.set(fach)
  return {password}
}

// const serverUrl = () => {
//   if(browser){
//     let url = location.hostname === "localhost" || location.hostname === "127.0.0.1" 
//     ? "http://localhost:8000" : "https://cat3poker-d07112c3d84c.herokuapp.com"
//      return url
//   }
// }