import React, { Component, Fragment } from 'react'
import {  Route, Routes } from 'react-router-dom'; 
import BaseProps from '../models/BaseProps';
import LoginPage from '../pages/auth/LoginPage';
import { ErrorView } from '../pages/error/ErrorView';
// import { ExperimentView } from '../pages/experiments/extended/ExperimentView';
import Home from '../pages/home/Home';
export class Routing extends Component<BaseProps, any>
{


    render(): React.ReactNode {
        return (
            <Fragment> 
                
                <Routes>
                    <Route path="/" element={ <Home   /> } />
                    <Route path="/home" element={ <Home   /> } /> 
                    <Route path="/login" element={ <LoginPage   /> } /> 
                    
                    <Route path="*" element={ <ErrorView    message="Not Found" /> } />
                </Routes>
            </Fragment>
        )
    }
}