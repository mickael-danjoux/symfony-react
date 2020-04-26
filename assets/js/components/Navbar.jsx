import React, {useContext} from 'react';
import AuthAPI from "../sevices/AuthAPI";
import {NavLink} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

/**
 *
 * @param history
 * @returns {*}
 * @constructor
 */
const Navbar = ({ history }) => {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

    /**
     * Log out user on click
     * @param event
     */
    const handleLogout = event => {
        event.preventDefault();
        AuthAPI.logout();
        setIsAuthenticated(false);
        history.push('/login');
    }

    return (<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <NavLink className="navbar-brand" to="/">Symfony React</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">

                <li className="nav-item ">
                    <NavLink className="nav-link" to="/people">
                        People
                    </NavLink>
                </li>

                {!isAuthenticated && (
                    <>
                        <li className="nav-item ">
                            <NavLink className="nav-link" to="/login">
                                Login
                            </NavLink>
                        </li>
                    </>
                ) || (
                    <>
                        <li className="nav-item">
                            <a className="nav-link" href="#/logout" onClick={handleLogout}>Logout</a>
                        </li>
                    </>
                )}
            </ul>

        </div>
    </nav>);
};

export default Navbar;