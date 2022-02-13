import axios, { AxiosError, AxiosResponse } from "axios";
import { injectable } from "inversify";
import { commonAuthorizedHeader } from "../utils/restApiUtil";

@injectable()
export default class RestClient
{
    postAuthorized = <T>(url:string, body:any, contentType='application/json') : Promise<T> => {
        return this.postCommon(url, body, commonAuthorizedHeader(contentType));
    }
    postCommon = <T>(url:string, body:any, headers:any) : Promise<T> => {
        return new Promise<T>((resolve, reject) => {
            
           
            axios.post(url, body, {
                headers: { ...headers }
            }).then((response: AxiosResponse) => {
                if (!response.data)
                {
                    reject(new Error("Invalid response data"));
                    return;
                }
                resolve(response.data.result);
            }).catch((err:AxiosError) =>{
                reject(err.response?.data ?? new Error(err.message))
            });
        });
    }

    getAuthorized = <T>(url:string) : Promise<T> => {
        return this.getCommon(url, commonAuthorizedHeader());
    }
    getCommon = <T>(url:string, headers:any) : Promise<T> => {
        return new Promise<T>((resolve, reject)=>{
            
            axios.get(url, { headers: {
                ...headers
            } })
                .then((response:AxiosResponse)=>{
                    if (!response.data)
                    {
                        reject(new Error("Invalid response data"));
                        return;
                    }
                    resolve(response.data.result);
                })
                .catch((err:AxiosError)=>{
                    reject(err.response?.data ?? new Error(err.message))
                });
        })
    }
}