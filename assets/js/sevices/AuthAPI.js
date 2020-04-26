import Axios from "axios";
import {API_ROUTE} from "../config/api";
import JwtDecode from "jwt-decode";

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

function logout(){
    window.localStorage.removeItem("authToken");
    delete Axios.defaults.headers["Authorization"]
}

function setup(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const { exp: expiration } = JwtDecode(token)
        if( expiration * 1000 > new Date().getTime() ){
            setAxiosToken(token)
        }
    }
}

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
 * 
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