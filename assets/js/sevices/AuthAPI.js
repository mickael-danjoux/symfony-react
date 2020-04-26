import Axios from "axios";
import {API_ROUTE} from "../config/api";
import JwtDecode from "jwt-decode";

/**
 * Log in User with Request and set token in header and localStorage
 * @param credentials
 * @returns {Promise<boolean>}
 */
function login(credentials){

    return Axios
        .post(API_ROUTE + `/login`,credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem("authToken",token)
            setAxiosToken(token)
            return true;
        })
}

/**
 * Log out by reset requestHeader and remove token
 */
function logout(){
    window.localStorage.removeItem("authToken");
    delete Axios.defaults.headers["Authorization"]
}

/**
 * Log user in app if token exists and is valid
 */
function setup(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const { exp: expiration } = JwtDecode(token)
        if( expiration * 1000 > new Date().getTime() ){
            setAxiosToken(token)
        }
    }
}

/**
 * Test if token exists and is valid in localStorage
 * @returns {boolean}
 */
function isAuthenticated(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const { exp: expiration } = JwtDecode(token)
        if( expiration * 1000 > new Date().getTime() ){
            return true;
        }
    }
    return false
}

/**
 * Set token in header request
 * @param token
 */
function setAxiosToken(token){
    Axios.defaults.headers["Authorization"] = "Bearer " + token
}

export default {
    login,
    logout,
    setup,
    isAuthenticated
}