import { resolve } from "inversify-react";
import React, { FormEvent  } from "react";  
import { Link } from "react-router-dom";
import BaseProps from "../models/BaseProps";
import { commonWrapper } from "../utils/commonWrapper";
import RoutingService from './../services/RoutingService';
import Settings from './../settings';
import AuthService from './../services/AuthService';
import ControlledComponent from "../pages/ControlledComponent";
import UserSection from "./UserSection";
import User from './../models/User';
import EventService from './../services/EventService';

class State {
    activeMenu:string | undefined;
    title:string        = Settings.App.uiSetting.defaultTitle;
    searchKey:string    = "";
 }
 class Props extends BaseProps {
     currentLocation?:Location;
 }
class HeaderView extends ControlledComponent<Props, State>
{
    @resolve(AuthService)
    private authService:AuthService;
    @resolve(RoutingService)
    private routingService:RoutingService;
    @resolve(EventService)
    private evtService:EventService;

    state:State = new State();

    private _user:User | undefined;
    
    componentDidMount() 
    {
        this.routingService.registerCallback("header", console.log);
        this.authService.addOnUserUpdated("header", this.onUserUpdated);
    }
    componentWillUnmount()
    {
        this.authService.removeOnUserUpdated("header");
    }
    gotoLoginPage = () => {
        if (this.props.navigate)
        {
            this.props.navigate("/login");
        }
    }
    onUserUpdated = (user: User | undefined) => {
        if (this._user != undefined && user == undefined)
        {
            this.gotoLoginPage();
        }
        this._user = user;
        this.forceUpdate();
    }

    private navigate = (url:string) => {
        if (this.props.navigate == undefined)
        {
            console.warn("no props: navigate");
            return;
        }
        this.props.navigate(url);
    }

    brandOnClick = () => {
       this.navigate("/");
    }

    onFormSearchSubmit = (e:FormEvent) => {
        e.preventDefault();
        if (!this.state.searchKey && this.state.searchKey.trim() == "")
        {
            return;
        }
        this.navigate("/search/"+this.state.searchKey);
        this.evtService.triggerProductSearchUpdate(this.state.searchKey);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="row w-100 mt-2">
                        <div className="col-md-2 mb-2 text-center">
                            <Link className="navbar-brand" to="/">{this.state.title}</Link>
                        </div>
                        <div className="col-md-8 mb-2">
                            <form onSubmit={this.onFormSearchSubmit}>
                                <div className="input-group">
                                    <input 
                                        value={this.state.searchKey}
                                        className="form-control" 
                                        name="searchKey"
                                        onChange={this.handleInputChange}
                                        placeholder="Search Products"/>
                                    <div className="input-group-append">
                                        <button
                                            type="submit"
                                            className="btn btn-success">
                                            <i className="fas fa-search mr-2"/> Search
                                        </button>

                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="col-md-2 mb-2 text-center">
                            { !this.authService.loggedIn?
                            <Link to="/login" className="btn btn-primary">
                               <i className="fas fa-sign-in-alt mr-2"/> Login
                            </Link>
                            : 
                            <UserSection user={this.authService.loggedUser}/> }

                        </div>
                    </div>

                </div>
            </nav>
        )

    }
}



export default commonWrapper(HeaderView);


