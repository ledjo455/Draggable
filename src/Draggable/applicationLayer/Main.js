import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './App';
import Admin from '../logicLayer/Admin/Admin';

function Main() {
    return (
        <div>
            <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='admin' element={<Admin />} />
            </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Main;