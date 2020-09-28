import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducers from "./AuthReducers";
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
import setToken from "../../utils/setToken";
import Axios from "axios";

const AuthState = ({ children }) => {
  //initial state
  const initialState = {
    userAuth: localStorage.getItem("token") || null,
    token: localStorage.getItem("token"),
    errors: null,
    user: null,
    userLoading: null,
    msg: null,
  };

  const [state, dispatch] = useReducer(AuthReducers, initialState);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //getting current loggedin user
  const getUser = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    try {
      const res = await Axios.get("http://localhost:5000/api/user");
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: AUTH_ERROR,
        payload: error.response,
      });
    }
  };

  //loging user in
  const userLogin = async (user) => {
    try {
      const res = await Axios.post(
        "http://localhost:5000/api/user/login",
        user,
        config
      );
      dispatch({
        type: SUCCESS_LOGIN,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: ERROR_LOGIN,
        payload: error.response,
      });
    }
  };

  //register new user

  const userRegister = async (user) => {
    try {
      const res = await Axios.post(
        "http://localhost:5000/api/user/register",
        user,
        config
      );
      console.log(res.data);
      dispatch({
        type: SUCCESS_REGISTER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: ERROR_REGISTER,
        payload: error.response,
      });
    }
  };

  //setUserLoading
  const setUserLoading = () => {
    dispatch({
      type: SET_USERLOADING,
    });
  };

  // logout
  const logoutUser = () => {
    dispatch({
      type: LOG_OUT,
    });
  };

  //clearing errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  //clearing msgs
  const clearMsg = () => {
    dispatch({
      type: CLEAR_MSG,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        userAuth: state.userAuth,
        errors: state.errors,
        token: state.token,
        user: state.user,
        userLoading: state.userLoading,
        msg: state.msg,
        userLogin,
        userRegister,
        setUserLoading,
        logoutUser,
        clearErrors,
        clearMsg,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
