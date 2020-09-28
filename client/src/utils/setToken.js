import Axios from "axios";

const setToken = (token) => {
  if (token) {
    Axios.defaults.headers.common["auth-token"] = token;
  } else {
    delete Axios.defaults.headers.common["auth-token"];
  }
};

export default setToken;
