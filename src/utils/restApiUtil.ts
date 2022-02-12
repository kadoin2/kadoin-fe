
import { getCookie, setCookie, removeCookie } from './cookieUtil';
const LOGIN_KEY_NAME = "kado-in-login-token"

export const commonAuthorizedHeader = () => {
    return {
        'Content-Type': 'application/json',
        'requestId': "ABCD",// getRequestId(),//'localStorage.getItem("requestId")',
        'Authorization': 'Bearer '+getCookie(LOGIN_KEY_NAME)
    }
};
export const commonHeader = () => {
    return {
        'Content-Type': 'application/json',
        // 'requestId': getRequestId(), 
    }
};
export const removeLoginKeyCookie = () => {
    removeCookie(LOGIN_KEY_NAME);
}
export const setLoginKeyCookie =  (token:string) => {
    setCookie(LOGIN_KEY_NAME, token);
}
