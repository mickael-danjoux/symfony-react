import React, {useContext} from 'react';
import AuthContext from "../contexts/AuthContext";
import {Redirect, Route} from "react-router-dom";

/**
 * Create route with component or redirect user if not log in
 * @param path
 * @param component
 * @param redirectPath
 * @returns {*}
 * @constructor
 */
const LoginRoute = ({path, component, redirectPath}) => {
    const {isAuthenticated} = useContext(AuthContext);

    return isAuthenticated ? (
        <Redirect to={redirectPath}/>
    ) : (
        <Route path={path} component={component}/>
    )
}

export default LoginRoute;