import React from "react";
import {Route,BrowserRouter as Router} from 'react-router-dom';
import Login from '../Components/Login';
import Profile from '../Components/Profile';
import Dashboard from '../Components/Dashboard';

const router =()=>{
    return(
        <Router>
            <Route exact path="/" component={Login} />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/Profile" component={Profile} />
        </Router>
    );
}

export default router;