import React, {useContext} from 'react';
import AuthContext from "../contexts/AuthContext";
import {Redirect, Route} from "react-router-dom";

/**
 * Create route with component or redirect user if not log in
 * @param path
 * @param component
 * @returns {*}
 * @constructor
 */
const PrivateRoute = ({path, component}) => {
    const {isAuthenticated} = useContext(AuthContext);

    return isAuthenticated ? (
        <Route path={path} component={component}/>
    ) : (
        <Redirect to="/login"/>
    )
}

export default PrivateRoute;