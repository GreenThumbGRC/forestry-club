import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router';

import App from './App';
import AdminReview from './AdminReview';

function Navigation() { 
    return <>
        <p>Navigation</p>
        <Outlet />
    </>

}

export default Navigation;