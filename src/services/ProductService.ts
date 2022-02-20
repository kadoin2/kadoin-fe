import { inject, injectable } from "inversify";
import ProductSearchResult from "../models/product/ProductSearchResult";
import ProductSpec from "../models/product/ProductSpec";
import Settings from "../settings";
import RestClient from './../apiClients/RestClient';
import SearchResultItem from './../models/product/SearchResultItem';



const SEARCH_URL     = Settings.App.hosts.api + "/api/product/search-ecommerce";
const DETAIL_URL     = Settings.App.hosts.api + "/api/product/search-ecommerce-detail";

@injectable()
export default class ProductService
{
    @inject(RestClient)
    private rest:RestClient;

    search = (key:string, startIndex:number) : Promise<ProductSearchResult> => {
        const url = SEARCH_URL + `?key=${key}&startIndex=${startIndex}`;
        return this.rest.getCommon(url, {});
    }

    getDetail = (item:SearchResultItem) : Promise<ProductSpec> => {
        const url = DETAIL_URL + `?link=${item.image.contextLink}`;
        return this.rest.getCommon(url, {});
    }
}