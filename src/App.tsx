import React from "react";
import {Router} from "@reach/router";
import {Home} from "./page/home";
import './App.scss'
import ReactGA from 'react-ga';
const TRACKING_ID = "UA-221463714-1"; // YOUR_OWN_TRACKING_ID

ReactGA.initialize(TRACKING_ID);
export const App = () => (

    <Router basepath={""}>
        <Home path="/"/>
    </Router>
);