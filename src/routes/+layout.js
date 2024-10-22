import { browser } from '$app/environment'
import { routes , handleAuthToken, otp} from "$lib/store/routes";
import { handleProfile } from "$lib/index";
import { auth } from "$lib/store/activities"
import { changeotp } from "$lib/store/routes";
import { AUTH_Script } from '$lib/auth/hook';

/** @type {import('./$types').PageLoad} */

export async function load({ route }) {
  let password = browser && JSON.parse(sessionStorage.getItem('password'));
  let fach = browser && JSON.parse(sessionStorage.getItem('otp'));
  const user = browser && JSON.parse(localStorage.getItem('drr'))
  const changeEmail = browser && JSON.parse(sessionStorage.getItem('change-email'))
  const _auth = new AUTH_Script()
  auth.set(_auth)
  if(user){
      await handleProfile(user)
  }

  changeotp.set(changeEmail)
  handleAuthToken.set(user)
  routes.set(route.id)
  otp.set(fach)
  return {password}
}