import React from 'react';
import HomePage from './pages/homePage/HomePage';
import Products from './pages/products/Products'

const routers = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage/>
    },
    {
        path: '/products',
        exact: true,
        main: () => <Products/>
    },
    {
        path: '/products/:categoryName',
        exact: true,
        main: () => <Products/>
    },
    {
        path: '/products/:categoryName/:categoryDetail',
        exact: true,
        main: () => <Products/>
    },


];

export default routers;