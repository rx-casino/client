import { browser } from '$app/environment'

export const getCookie = (name, defaultValue = '') => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift() || defaultValue;
};

export const setCookie = (key,value) => {
    document.cookie = `${key}=${value}; path=/;`;
}

export function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
    console.log(`Cookie '${name}' has been deleted.`);
    if(browser){
        window.location.href = "/"
    }
}