import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from './components/Welcome';
import Target from "./components/Target";
import Game from "./components/Game";

const AppRouter = () => ( 
    <BrowserRouter> 
        <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/setTarget' element={<Target />} />
            <Route path='/game' element={<Game />} />
        </Routes>
    </BrowserRouter>    
)

export default AppRouter;