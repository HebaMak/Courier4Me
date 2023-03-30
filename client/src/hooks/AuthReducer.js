export const INITIAL_VALUE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  isLogged: JSON.parse(localStorage.getItem("user")) || false,
};

export const AuthReducer = (state, action) => {
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
