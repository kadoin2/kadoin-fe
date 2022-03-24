import { ReactNode } from "react";
import { ViewTemplate } from "../../layout/ViewTemplate";
import { commonWrapper } from "../../utils/commonWrapper";
import BaseProps from '../../models/BaseProps';
import BaseMasterDataPage from "./BaseMasterDataPage";
import BaseMasterDataState from '../../models/BaseMasterDataState';
import PaginationButtons from "../../components/buttons/PaginationButtons";
import Product from './../../models/Product';
import ErrorMessage from "../../components/messages/ErrorMessage";
import AnchorButton from "../../components/buttons/AnchorButton";
import { currencyNumber } from "../../utils/stringUtil";

class State extends BaseMasterDataState<Product>
{

}
class ProductsPage extends BaseMasterDataPage<Product, BaseProps, State>
{
    state: State = new State();
    constructor(props: BaseProps) {
        super(props, "products", "Product Management")
        this.state.item = new Product();
    }
    get defaultItem(): Product { return new Product() }
    
    render(): ReactNode {
        
        if (this.state.showForm)
        {

            return (
                <ViewTemplate title={this.title}>
                    <div className="mb-3">
                        <AnchorButton onClick={this.hideForm} className="btn btn-light">Close Form</AnchorButton>
                    </div>
                    <form onSubmit={this.onFormSubmit}>
                        <p>Name</p>
                        <input
                            className="form-control form-control-sm"
                            value={this.item?.name}
                            onChange={this.handleInputChange}
                            name="item.name" required/>
                        <p>Price</p>
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            value={this.item?.price}
                            onChange={this.handleInputChange}
                            name="item.price" required/>
                        <p>Desc</p>
                        <textarea
                            className="form-control form-control-sm"
                            value={this.item?.description}
                            onChange={this.handleInputChange}
                            name="item.description" required/>
                        <p>Image Link</p>
                        <input
                            className="form-control form-control-sm"
                            value={this.item?.image}
                            onChange={this.handleInputChange}
                            name="item.image" required/>
                        <p/>
                        <input type="submit" className="btn btn-primary" value={"Submit"} />
                    </form>
                </ViewTemplate>
            )
        }

        const result = this.state.result;
        const items = result.items;
        return (
            <ViewTemplate title={this.title}>
                <div className="mb-3">
                    <AnchorButton onClick={this.showForm} iconClass="fas fa-plus" className="btn btn-light">Add Record</AnchorButton>
                </div>
                {items == undefined ?
                    <i>Loading...</i> :
                    items.length == 0 ?
                    <ErrorMessage children={"No items"} /> : 
                    <div className="mt-5 pl-3 pr-3">
                        <PaginationButtons 
                            limit={result.perPage} 
                            totalData={result.totalData} 
                            activePage={result.page} 
                            onClick={this.load} />
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, i) => {
                                    return (
                                        <tr key={"product-" + item.id}>
                                            <td>{this.startingNumber + i}</td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>{currencyNumber(item.price)}</td>
                                            <td>
                                                <img className="border"  alt={item.image} src={item.image} width={50} height={50} />
                                                <br/>
                                                <a target={"_blank"} href={item.image}>
                                                    view
                                                </a>
                                            </td>
                                            <td>
                                               {this.actionButton(item)}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>}
            </ViewTemplate>
        )
    }
}

export default commonWrapper(ProductsPage)