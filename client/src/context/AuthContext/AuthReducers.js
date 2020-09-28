import {
  SUCCESS_LOGIN,
  SUCCESS_REGISTER,
  SET_USERLOADING,
  ERROR_REGISTER,
  ERROR_LOGIN,
  CLEAR_ERRORS,
  CLEAR_MSG,
  LOG_OUT,
  GET_USER,
  AUTH_ERROR,
} from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case SUCCESS_LOGIN:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        userAuth: localStorage.getItem("token") || null,
        user: payload,
        errors: null,
        token: localStorage.getItem("token"),
        userLoading: false,
        msg: payload.msg,
      };
    case SUCCESS_REGISTER:
      return {
        ...state,
        errors: null,
        msg: payload.msg,
        userLoading: false,
      };
    case SET_USERLOADING:
      return {
        ...state,
        userLoading: true,
      };
    case ERROR_REGISTER:
    case ERROR_LOGIN:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        errors: payload,
        msg: null,
        userLoading: null,
      };
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        userAuth: localStorage.getItem("token") || false,
        user: null,
        errors: null,
        token: null,
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        errors: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        user: null,
        errors: payload,
        token: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        user: null,
        errors: null,
        userLoading: null,
      };
    case CLEAR_MSG:
      return {
        ...state,
        msg: null,
        userLoading: null,
      };
    default:
      return state;
  }
};
