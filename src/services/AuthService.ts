import { inject, injectable } from "inversify";
import User from "../models/User";
import Settings from './../settings';
import WebResponse from './../models/WebResponse';
import axios, { AxiosError, AxiosResponse } from "axios";
import { removeLoginKeyCookie, setLoginKeyCookie,commonAuthorizedHeader } from './../utils/restApiUtil';
import ApplicationProfile from './../models/ApplicationProfile';
import RestClient from './../apiClients/RestClient';


const LOGIN_URL     = Settings.App.hosts.api + "/api/auth/login";
const LOGOUT_URL    = Settings.App.hosts.api + "/api/auth/logout";
const REGISTER_URL  = Settings.App.hosts.api + "/api/auth/register";
const LOAD_APP_URL  = Settings.App.hosts.api + "/api/public/index";

@injectable()
export default class AuthService {
     
    private _loggedUser:User | undefined;
    private _appProfile:ApplicationProfile | undefined;
    private _onUserUpdate:Map<string, (user:User | undefined) =>any> = new Map();

    @inject(RestClient)
    private rest:RestClient;
 
    get loggedIn() { return this._loggedUser != undefined; }

    get loggedUser() { 
        return this._loggedUser; 
    }
    get appProfile()
    {
        return this._appProfile;
    }
    
    private set loggedUser(value:User | undefined) { 
        this._loggedUser = value; 
        this._onUserUpdate.forEach(action => action(value))
    }

    addOnUserUpdated = (key:string, action:(user:User|undefined) => any) => {
        this._onUserUpdate.set(key, action);
    }
    removeOnUserUpdated = (key:string) => {
        this._onUserUpdate.delete(key);
    }

    loadApplication = () : Promise<ApplicationProfile> => {
        
        return new Promise<ApplicationProfile>((resolve, reject)=>{
            
            axios.get(LOAD_APP_URL, { headers: commonAuthorizedHeader() })
                .then((response:any)=>{
                    this.handleAppLoaded(response);
                    resolve(response.data.result);
                })
                .catch(reject);
        })
    }

    login = (email: string, password: string): Promise<User> => {
        
        return new Promise<User>((resolve, reject) => {
            
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);

            axios.post(LOGIN_URL, formData, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then((response: AxiosResponse) => {

                const responseJson:WebResponse<User>    = response.data;
                const loginKey                          = response.headers['access-token'];
                
                this.handleSuccessLogin(responseJson.result, loginKey);
                resolve(responseJson.result);
            }).catch((err:AxiosError) =>{
                reject(err.response?.data ?? new Error(err.message))
            });
        });
    }
    register = (
        email: string, 
        name:string, 
        displayName:string,
        password: string ): Promise<User> => {

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("name", name);
        formData.append("displayName", displayName);
        return this.rest.postCommon(REGISTER_URL, formData, { 'Content-Type': 'application/x-www-form-urlencoded' });
    }

    handleSuccessLogin = (user:User, token:string) => {
        setLoginKeyCookie(token);
        this.loggedUser = user;
    }

    handleAppLoaded = (response:AxiosResponse) => {
        if (response.headers["access-token"] && response.headers["access-token"] != "")
        {
            this.handleSuccessLogin(response.data.user, response.headers['access-token']);
        }
    }

    logout = () => {
        removeLoginKeyCookie();
        this.loggedUser = undefined;
        return this.rest.postAuthorized(LOGOUT_URL, {});
    }
}