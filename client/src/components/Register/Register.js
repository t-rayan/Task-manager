import React, { useState, useContext } from "react";
import "./register.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import AuthContext from "../../context/AuthContext/AuthContext";
import { ErrorAlert, SuccessAlert } from "../../components";

const Register = () => {
  const {
    userRegister,
    errors,
    clearErrors,
    msg,
    userLoading,
    setUserLoading,
  } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const { fullname, email, password } = formData;
  const handleChange = (e) => {
    clearErrors();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  //function to handle form submit
  const handleRegister = (e) => {
    e.preventDefault();
    setUserLoading();
    userRegister({ fullname, email, password });

    setFormData({
      fullname: "",
      email: "",
      password: "",
    });
  };
  return (
    <Form className="authForm registerForm" onSubmit={handleRegister}>
      <h4 className="authHeading mb-5">Register for new account</h4>
      {msg ? <SuccessAlert /> : null}
      <FormGroup>
        <Label for="fullname">Fullname</Label>
        <Input
          type="text"
          name="fullname"
          value={fullname}
          onChange={handleChange}
          className="formControl"
          placeholder="Your name"
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="formControl"
          placeholder="Your email"
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Password</Label>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          className="formControl"
          placeholder="Your password"
        />
      </FormGroup>
      {errors ? <ErrorAlert /> : null}
      <Button className="authBtn registerBtn shadow">
        {userLoading ? "Registering" : "Register"}
      </Button>
    </Form>
  );
};

export default Register;
