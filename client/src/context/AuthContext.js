import React, { createContext, useEffect, useState, useReducer } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const INITIAL_VALUE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  isLogged: JSON.parse(localStorage.getItem("user")) || false,
};

export const AuthContext = createContext(INITIAL_VALUE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
        isLogged: true,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
        isLogged: false,
      };
    case "LOGOUT":
      return {
        loading: false,
        error: null,
        isLogged: false,
        user: null,
      };
    default:
      return state;
  }
};

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
