import React from 'react';

// Create a context with a default value
const GlobalContext = React.createContext({
  modelUrl: '',
});

// Export the context so it can be used by other components
export default GlobalContext;