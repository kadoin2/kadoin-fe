import { inject, injectable } from "inversify";
import ProductSearchResult from "../models/product/ProductSearchResult";
import Settings from "../settings";
import RestClient from './../apiClients/RestClient';



const SEARCH_URL     = Settings.App.hosts.api + "/api/product/search";

@injectable()
export default class ProductService
{
    @inject(RestClient)
    private rest:RestClient;

    search = (key:string, startIndex:number) : Promise<ProductSearchResult> => {
        const url = SEARCH_URL + `?key=${key}&startIndex=${startIndex}`;
        return this.rest.getCommon(url, {});
    }
}