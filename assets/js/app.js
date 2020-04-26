import React, {useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";

import '../css/app.css';
import Navbar from "./components/Navbar";
import Homepage from "./pages/HomePage";
import PeoplePage from "./pages/PeopleListPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import PersonPage from "./pages/Person";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./sevices/AuthAPI";
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import LoginRoute from "./components/LoginRoute";

/**
 * Get user's app state
 */
AuthAPI.setup();

/**
 *
 * @returns {*}
 * @constructor
 */
const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthAPI.isAuthenticated()
    );

    /**
     * Send props to Navbar component since is not in router switch
     */
    const NavBarWithRouter = withRouter(Navbar);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
            <HashRouter>
                <NavBarWithRouter/>
                <main className="container pt-5">
                    <Switch>
                        <LoginRoute path="/login" component={LoginPage} redirectPath="/people" />
                        <PrivateRoute path="/people/:id" component={PersonPage}/>
                        <PrivateRoute path="/people" component={PeoplePage}/>
                        <Route path="/" component={Homepage}/>
                    </Switch>
                </main>
                <ToastContainer/>
            </HashRouter>
        </AuthContext.Provider>
    )
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);
