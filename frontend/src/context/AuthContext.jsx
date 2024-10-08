import { createContext, useContext, useState } from "react";

//creating context api and providing the props to the entire application from retrieving the details of the user after their signup from the local storage so that they can be provided for the ease usage of the login functionality
export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  //local storage will provide the info in the string form we will be suing JSON parse to convert the string to the object notation to be in the use
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
