import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./login.css";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import AuthContext from "../../context/AuthContext/AuthContext";
import { ErrorAlert, Register } from "../../components";

const Login = () => {
  const history = useHistory();
  const {
    userLogin,
    errors,
    clearErrors,
    token,
    clearMsg,
    userLoading,
    setUserLoading,
  } = useContext(AuthContext);
  const [status, setStatus] = useState(true);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { email, password } = credentials;

  //change status
  const changeStatus = () => {
    setStatus(!status);
    clearErrors();
    clearMsg();
  };

  //handling change
  const handleChange = (e) => {
    clearErrors();
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  //handling login
  const handleLogin = (e) => {
    e.preventDefault();
    setUserLoading();
    userLogin({ email, password });
  };

  //useEffect hook
  useEffect(() => {
    if (token) {
      history.push("/dashboard");
    }
  }, [token, history]);

  const loginForm = (
    <Form className="authForm loginForm" onSubmit={handleLogin}>
      <h3 className="authHeading mb-5">Login to continue</h3>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          type="email"
          name="email"
          value={email}
          className="formControl"
          placeholder="Your email"
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          value={password}
          className="formControl"
          placeholder="Your password"
          onChange={handleChange}
        />
      </FormGroup>
      {errors ? <ErrorAlert /> : null}
      <Button className="authBtn loginBtn shadow">
        {userLoading ? "Loading" : "Log In"}
      </Button>
    </Form>
  );

  return (
    <div>
      {status ? loginForm : <Register />}
      <div className="mt-4">
        <p className="question">
          {status ? "Need an account ?" : "Already have account ?"}
          <span className="register-link ml-2" onClick={changeStatus}>
            {status ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
