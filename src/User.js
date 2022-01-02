import React from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider
      value={{
        name: "im-adithya",
        prs: 40,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
