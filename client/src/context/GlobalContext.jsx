import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [load, setLoad] = useState(false);
  const [loguserInfo, setLogUserInfo] = useState({});

  return (
    <GlobalContext.Provider
      value={{
        loguserInfo,
        setLogUserInfo,
        load,
        setLoad,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
