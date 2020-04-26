const cache = {};

/**
 * Set cache in var
 * @param key
 * @param data
 */
function set(key, data) {
    cache[key] = {
        data,
        cachedAt: new Date().getTime()
    }
}

/**
 * Get cache
 * @param key
 * @returns {Promise<unknown>}
 */
function get(key) {
    return new Promise((resolve) => {
        resolve(
            cache[key] && cache[key].cachedAt + 15 * 60 * 1000 > new Date().getTime()
                ? cache[key].data
                : null)
        ;
    })
}

/**
 * erase cache
 * @param key
 */
function invalidate( key ){
    delete cache[key];
}

export default {
    set,
    get,
    invalidate
}