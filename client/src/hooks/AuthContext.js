import React, { createContext, useEffect, useState, useReducer } from "react";
import PropTypes from "prop-types";
import { INITIAL_VALUE, AuthReducer } from "../AuthReducer";
import axios from "axios";

export const AuthContext = createContext(INITIAL_VALUE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_VALUE);
  const [currentUser, setCurrentUser] = useState(state.user);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("isLogged", JSON.stringify(state.isLogged));
    setCurrentUser(state.user);

    const fetchedUser = async () => {
      const cUser = await axios.get(
        `${process.env.BASE_SERVER_URL}/api/user/${state.user._id}`
      );
      setCurrentUser(cUser.data.user);
    };

    fetchedUser();
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("isLogged", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        dispatch,
        isLogged: state.isLogged,
        user: state.user,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
