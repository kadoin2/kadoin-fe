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
import { CommonTable } from "../../utils/componentUtil";

class State  extends BaseState
{
    email:string            = "";
    password:string         = "";
    passwordRepeat:string   = "";
    displayName:string      = "";
    name:string             = "";
    phone:string            = "";

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

        if (this.state.password !== this.state.passwordRepeat)
        {
            this.setState({error: new Error("Password mismatch")});
            return;
        }

        this.setState({ loading: true });

        this.authService.register(
            this.state.email, 
            this.state.name,
            this.state.displayName,
            this.state.password,
            this.state.phone)
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
                <form onSubmit={this.onSubmit} className="row mt-3">
                    <div className="col-md-4"/>
                    <div className="col-md-4 bg-light" style={{padding: 20}}>
                        
                        <ErrorMessage show={this.state.error != undefined}>
                            {this.state.error?.message}
                        </ErrorMessage> 
                        <CommonTable
                            className="table table-borderless"
                            content={[
                                [
                                    "Email",
                                    <input 
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        className="form-control" 
                                        required/>
                                ],
                                [
                                    "Username",
                                    <input 
                                        name="name"
                                        id="name"
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                        className="form-control" 
                                        required/>
                                ],
                                [
                                    "Display Name",
                                    <input 
                                        name="displayName"
                                        id="displayName"
                                        value={this.state.displayName}
                                        onChange={this.handleInputChange}
                                        className="form-control" 
                                        required/>
                                ],
                                [
                                    "Phone Number",
                                    <input 
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        value={this.state.phone}
                                        onChange={this.handleInputChange}
                                        className="form-control" 
                                        required/>
                                ],
                                [
                                    "Password",
                                    <input 
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                        className="form-control"
                                        required/>
                                ],
                                [
                                    "Repeat Password",
                                    <input 
                                        type="password"
                                        name="passwordRepeat"
                                        id="passwordRepeat"
                                        value={this.state.passwordRepeat}
                                        onChange={this.handleInputChange}
                                        className="form-control"
                                        required/>
                                ]
                            ]} />
                        { this.state.loading? 
                        <i>Please wait...</i> : 
                        <ActionButton className="btn btn-success mt-3">
                            Register
                        </ActionButton> }
                        <p className="mt-3">
                            Already have account? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </form>
            </ViewTemplate>
        )
    }
}

export default commonWrapper(LoginPage)