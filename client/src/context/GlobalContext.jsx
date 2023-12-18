import React, { createContext,useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  return (
    <GlobalContext.Provider value={{ auth, setAuth }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
