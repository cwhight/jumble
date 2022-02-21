import React from "react";
import {Router} from "@reach/router";
import {Home} from "./page/home";
import './App.scss'

export const App = () => (

    <Router basepath={""}>
        <Home path="/"/>
    </Router>
);