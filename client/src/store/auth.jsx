import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState();
   const [posts, setPosts] = useState();

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const isLogIn = !!token;

  const logOutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      const responce = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (responce.ok) {
        const data = await responce.json();
        setUser(data.userData);
      }
    } catch (error) {
      console.error("Error Fetching User Data");
    }
  };

  const getPosts = async () => {
    try {
      const responce = await fetch(
        "http://localhost:5000/api/post/createpost",
        {
          method: "GET",
        }
      );
      if (responce.ok) {
        const data = await responce.json();
        setPosts(data.message);
      }
    } catch (error) {
      console.error("Error In fetching events");
    }
  };


  useEffect(() => {
    userAuthentication();
    getPosts();
  }, [isLogIn]);

  return (
    <AuthContext.Provider value={{ storeTokenInLS, logOutUser, getPosts, isLogIn, user, posts }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Proviser");
  }
  return authContextValue;
};
