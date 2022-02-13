
import { resolve } from 'inversify-react';
import { Component, ReactNode, FormEvent } from 'react';
import ErrorMessage from '../../components/messages/ErrorMessage';
import AuthService from '../../services/AuthService';
import ControlledComponent from '../ControlledComponent';
import SearchResultItem from './../../models/product/SearchResultItem';
interface Props 
{
    item: SearchResultItem
}
class State 
{
    loggedIn: boolean = false;
    orderCount: number = 0;
    phoneNumber: string  = "";
    note: string = "";
    address: string = "";
}
export default class OrderView extends ControlledComponent<Props, State>
{
    state: Readonly<State> = new State();
    @resolve(AuthService)
    private authService:AuthService;
    constructor(props:Props)
    {
        super(props);
        console.log("Props: ", props);
    }
    componentDidMount()
    {
        this.setState({ loggedIn: this.authService.loggedIn, phoneNumber: this.authService.loggedUser?.phoneNumber ?? "" });
    }
    onSubmit = (e:FormEvent) => {
        e.preventDefault();
    }

    render(): ReactNode {
        if (!this.state.loggedIn)
        {
            return (
                <ErrorMessage>
                    Please log in to order this product
                </ErrorMessage>
            )
        }
        return (
            <div>
                <h3 className='text-center'>Order product from <small>{this.props.item?.displayLink}</small></h3>
                <div className='row w-100 mt-5'>
                    <div className='col-md-3'>
                        <img className='image' width={200} src={this.props.item.link} />
                    </div>
                    <div className='col-md-5'>
                        <form onSubmit={this.onSubmit}>
                            <p>Order Count</p>
                            <input 
                                type="number" 
                                name="orderCount"
                                value={this.state.orderCount} 
                                onChange={this.handleInputChange}
                                className='form-control mb-2'
                                min={1}
                                required />
                            <p>Phone Number</p>
                            <input
                                name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={this.handleInputChange}
                                className="form-control mb-2"
                                required />
                            <p>Address</p>
                            <textarea
                                name="address"
                                value={this.state.address}
                                onChange={this.handleInputChange}
                                className="form-control mb-2"
                                required />
                            <p>Note</p>
                            <textarea
                                name="note"
                                value={this.state.note}
                                onChange={this.handleInputChange}
                                className="form-control mb-2"
                                 />
                            <input type='submit' className='btn btn-success mt-2' value={'Submit'} />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}