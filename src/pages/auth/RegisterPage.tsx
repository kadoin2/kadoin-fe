import { BasePage } from "../BasePage";
import BaseProps from '../../models/BaseProps';
import { FormEvent, ReactNode } from "react";
import { ViewTemplate } from "../../layout/ViewTemplate";
import { commonWrapper } from '../../utils/commonWrapper';
import BaseState from '../../models/BaseState';
import { Link } from "react-router-dom";
import ErrorMessage from '../../components/messages/ErrorMessage';
import InfoMessage from '../../components/messages/InfoMessage';
import { invokeLater } from '../../utils/eventUtil';
import ActionButton from '../../components/buttons/ActionButton';

class State  extends BaseState
{
    email:string            = "";
    password:string         = "";
    displayName:string      = "";
    name:string             = "";

    loading:boolean         = false;
    success:boolean         = false;
}
class LoginPage extends BasePage<BaseProps, State>
{
    state: Readonly<State> = new State();
   
    constructor(props:BaseProps)
    {
        super(props, false, "Register");
    }
    onSubmit = (e:FormEvent) => {
        e.preventDefault();
        this.setState({ loading: true });

        this.authService.register(
            this.state.email, 
            this.state.name,
            this.state.displayName,
            this.state.password)
            .then((user) => {
                this.setState({ error: undefined, success: true });
            })
            .catch((err) => {
                this.setState({ error: new Error(err?.message) });
            })
            .finally(() => {
                this.setState({ loading: false });
            })
    }

    componentDidMount(): void {
        if (this.authService.loggedIn)
        {
            this.navigate("/");
        }
        
    }

    render(): ReactNode {
        
        if (this.state.success)
        {
            return (
                <ViewTemplate>
                    <div className="pt-5 pb-5 pl-5 pr-5 text-center">
                        <InfoMessage >
                            Register Success. Click <Link to="/login">here</Link> to login
                        </InfoMessage> 
                    </div>
                </ViewTemplate>
            )
        }
        return (
            <ViewTemplate >
                <form onSubmit={this.onSubmit} className="row mt-5 pt-5">
                    <div className="col-md-4"/>
                    <div className="col-md-4 bg-light" style={{padding: 20}}>
                        
                        <ErrorMessage show={this.state.error != undefined}>
                            {this.state.error?.message}
                        </ErrorMessage> 
                        

                        <p>Email</p>
                        <input 
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            className="form-control" 
                            required/>
                        <p>Username</p>
                        <input 
                            name="name"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            className="form-control" 
                            required/>
                        <p>Display Name</p>
                        <input 
                            name="displayName"
                            value={this.state.displayName}
                            onChange={this.handleInputChange}
                            className="form-control" 
                            required/>
                        <p>Password</p>
                        <input 
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            className="form-control"
                            required/>
                        { this.state.loading? 
                        <i>Please wait...</i> : 
                        <ActionButton className="btn btn-success mt-3">
                            Register
                        </ActionButton> }
                    </div>
                </form>
            </ViewTemplate>
        )
    }
}

export default commonWrapper(LoginPage)