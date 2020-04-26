import React from 'react';

/**
 * Create user's app state context
 */
export default React.createContext({
    isAuthenticated: false,
    setIsAuthenticated: (value) => {}
})