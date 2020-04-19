import Axios from "axios";
import {API_ROUTE} from "../config/api";


function findAll(currentPage = null, itemsPerPage = null, orderRequest = null){
    let orderBy = "";

    if(orderRequest !== null){
        orderRequest.map( (order) =>
            orderBy += `&order[${order.name}]=${order.sort}`
        );
    }
    return Axios
        .get(API_ROUTE + `/people?page=${currentPage}&itemsPerPage=${itemsPerPage}${orderBy}`)
        .then(response => response.data)
}

export default {
    findAll
}