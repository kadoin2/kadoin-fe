
import React, { Fragment, ReactNode } from "react";
import { ViewTemplate } from "../../layout/ViewTemplate";
import { commonWrapper } from "../../utils/commonWrapper";
import { BasePage } from "../BasePage";
import BaseProps from './../../models/BaseProps';
import BaseState from './../../models/BaseState';
import ProductSearchResult from '../../models/product/ProductSearchResult';
import ProductService from './../../services/ProductService';
import { resolve } from 'inversify-react';
import ErrorMessage from "../../components/messages/ErrorMessage";
import EventService from './../../services/EventService';
import SearchResultItem from './../../models/product/SearchResultItem';
import DialogService from './../../services/DialogService';
import OrderView from "./OrderView";

class State extends BaseState
{
    searchResult : ProductSearchResult | undefined;
    searchKey:string | undefined;
    loading: boolean = false;
}
class SearchPage extends BasePage<BaseProps, State>
{
    state: Readonly<State> = new State();

    @resolve(ProductService)
    private productService: ProductService;
    @resolve(EventService)
    private evtService:EventService;

    constructor(props:any)
    {
        super(props, false, "Search");
    }

    componentDidMount(): void {
        this.evtService.addOnProductSearchUpdate("searchpage", this.search);
        if (!this.props.routeParams || !this.props.routeParams['searchKey'])
        {
            return;
        }
        this.search(this.props.routeParams['searchKey']);
    }

    componentWillUnmount()
    {
        this.evtService.removeOnProductSearchUpdate("searchpage");
    }

    search = (key:string, startIndex:number = 1) => {
        this.setState({ loading: true, searchKey: key });
        this.productService.search(key, startIndex)
            .then(response => {
                this.setState({ searchResult: response });
            })
            .catch(console.error)
            .finally(()=>{
                this.setState({ loading: false });
            })
    }
    gotoIndex = (i:number) => {
        if (!this.state.searchKey)
        {
            return;
        }
        this.search(this.state.searchKey, i);
    }
    order = (item:SearchResultItem) => {
        this.dialog.showContent("Order Item", <OrderView item={item}/>)
    }
    render(): ReactNode {
        if (!this.state.searchKey)
        {
            return (
                <ViewTemplate>
                    <p>Please provide search key</p>
                </ViewTemplate>
            )
        }
        return (
            <ViewTemplate>
                <div className="row w-100 mb-5 ">
                   
                    { this.state.loading ?
                    <div className="col-12 text-center"><i>Loading...</i></div> :
                    this.state.searchResult == undefined || this.state.searchResult.items.length == 0 ?
                    <ErrorMessage >
                        No Result
                    </ErrorMessage> :
                    <SearchResult 
                        gotoIndex={this.gotoIndex}
                        searchKey={this.state.searchKey} 
                        result={this.state.searchResult}
                        order={this.order}/>}
                </div>
            </ViewTemplate>
        )
    }
}

export default commonWrapper(SearchPage);

const SearchResult = (props:{
    searchKey:string, 
    result: ProductSearchResult, 
    order:(item:SearchResultItem) => any,
    gotoIndex:(i:number)=>any}) => {
    const nextPage = props.result.queries.nextPage;
    const reqPage  = props.result.queries.request;
    return (
        <Fragment>
             <div className="col-md-12">
                <h4>Search Result: <b>"{props.searchKey}"</b> </h4>
            </div>
            <div className="col-md-12 mt-2 mb-2 text-center">
            {reqPage && reqPage.length > 0 && reqPage[0].startIndex > 1?
                <a className="btn btn-outline-primary btn-sm mr-2" onClick={()=>props.gotoIndex(reqPage[0].startIndex - reqPage[0].count)}>
                    Prev
                </a> : null 
            }        
            {nextPage && nextPage.length > 0?
                <a className="btn btn-outline-primary btn-sm" onClick={()=>props.gotoIndex(nextPage[0].startIndex)}>
                    Next
                </a> : null 
            }
            </div>
            {props.result.items.map((item)=>{

                return (
                    <div className="col-md-2 mt-2">
                        <div className="border border-gray pt-1 pb-1 pl-1 pr-1">
                            <div style={{
                                backgroundImage: `url(${item.image.thumbnailLink})`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                height: 100
                            }}>

                            </div>
                            <a target={"_blank"} href={item.image.contextLink} className="badge bg-light">
                                {item.displayLink}
                            </a>
                            <label dangerouslySetInnerHTML={{
                                __html: item.htmlTitle
                            }}></label>
                            <a className="btn btn-primary btn-sm" onClick={()=>props.order(item)}>
                                Order
                            </a>
                        </div>
                    </div>
                )
            })}
           
        </Fragment>
    )
}