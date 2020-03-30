import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdminIndex from './adminIndex/index';
import LoginPage from './login/index';

function Main() {
    return (
        <Router>
            <Route path="/management/index/" component={ AdminIndex } />
            <Route path="/management" exact component={ LoginPage } />
            <Route path="/management/login/" exact component={ LoginPage } />
        </Router>
    );
}

export default Main;