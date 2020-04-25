import Axios from "axios";
import {API_ROUTE} from "../config/api";


function findAll(entity, currentPage = null, itemsPerPage = null, orderRequest = null, searchRequest = null){
    let orderBy = "";
    let search = "";

    if(orderRequest !== null){
        orderRequest.map( (order) =>
            orderBy += `&order[${order.name}]=${order.sort}`
        );
    }
    if(searchRequest !== null){
        searchRequest.map( (search) =>
            search += `&${search.name}]=${search.value}`
        );
    }
    return Axios
        .get(API_ROUTE + `/${entity}?page=${currentPage}&itemsPerPage=${itemsPerPage}${orderBy}${search}`)
        .then(response => response.data)
}

function findOne(entity, id){
    return Axios
        .get(API_ROUTE + `/${entity}/${id}`)
        .then(response => response.data)
}

function deleteItem(entity, id){
    return Axios
        .delete(API_ROUTE + `/${entity}/${id}`)
}

function postItem(entity, item){
    return Axios
        .post(API_ROUTE + `/${entity}`, item)
        .then(response => response.data)
}

function putItem(entity, id, item){
    return Axios
        .post(API_ROUTE + `/${entity}/${id}`, item)
        .then(response => response.data)
}

export default {
    findAll,
    findOne,
    delete : deleteItem,
    post : postItem
}