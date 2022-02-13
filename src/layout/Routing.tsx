import React, { Component, Fragment } from 'react'
import {  Route, Routes } from 'react-router-dom'; 
import BaseProps from '../models/BaseProps';
import MainAdminPage from '../pages/admin/MainAdminPage';
import ProductsPage from '../pages/admin/ProductsPage';
import UsersPage from '../pages/admin/UsersPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import { ErrorView } from '../pages/error/ErrorView';
// import { ExperimentView } from '../pages/experiments/extended/ExperimentView';
import Home from '../pages/home/Home';
import SearchPage from '../pages/product/SearchPage';
export class Routing extends Component<BaseProps, any>
{


    render(): React.ReactNode {
        return (
            <Fragment> 
                
                <Routes>
                    <Route path="/" element={ <Home/> } />
                    <Route path="/home" element={ <Home/> } /> 
                    
                    <Route path="/login" element={ <LoginPage/> } /> 
                    <Route path="/register" element={ <RegisterPage/> } /> 

                    <Route path="/search/:searchKey" element={ <SearchPage/> } /> 

                    <Route path="/admin" element={ <MainAdminPage/> } /> 
                    <Route path="/admin/users" element={ <UsersPage/> } /> 
                    <Route path="/admin/products" element={ <ProductsPage/> } /> 
                    
                    <Route path="*" element={ <ErrorView    message="The requested page is not found." /> } />
                </Routes>
            </Fragment>
        )
    }
}