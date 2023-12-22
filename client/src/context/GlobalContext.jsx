import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loguser, setLogUser] = useState({});

  return (
    <GlobalContext.Provider value={{ auth, setAuth, loguser, setLogUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
