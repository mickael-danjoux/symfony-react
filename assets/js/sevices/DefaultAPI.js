import Axios from "axios";
import {API_ROUTE} from "../config/api";
import Cache from "./cache"

/**
 * find all data for entity
 * @param entity
 * @param currentPage
 * @param itemsPerPage
 * @param orderRequest
 * @param searchRequest
 * @returns {Promise<AxiosResponse<any>>}
 */
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

/**
 * Find one item for an entity
 * @param entity
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
function findOne(entity, id){
    return Axios
        .get(API_ROUTE + `/${entity}/${id}`)
        .then(response => response.data)
}

/**
 * Delete one entity item
 * @param entity
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
function deleteItem(entity, id){
    return Axios
        .delete(API_ROUTE + `/${entity}/${id}`)
}

/**
 * Add an entity item
 * @param entity
 * @param item
 * @returns {Promise<AxiosResponse<any>>}
 */
function postItem(entity, item){
    return Axios
        .post(API_ROUTE + `/${entity}`, item)
        .then(response => response.data)
}

/**
 * Update an entity item
 * @param entity
 * @param id
 * @param item
 * @returns {Promise<AxiosResponse<any>>}
 */
function putItem(entity, id, item){
    return Axios
        .put(API_ROUTE + `/${entity}/${id}`, item)
        .then(response => response.data)
}

export default {
    findAll,
    findOne,
    delete : deleteItem,
    post : postItem,
    put : putItem
}