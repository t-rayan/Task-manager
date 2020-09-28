import React from "react";
import { Login } from "../../components";
import showcase from "../../images/showcase.svg";
import "./home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="formContainer">
        <Login />
      </div>
      <div className="showcase d-flex justify-content-center align-items-center">
        <img className="showcase-img" src={showcase} alt="showcase-img" />
      </div>
    </div>
  );
};

export default Home;
