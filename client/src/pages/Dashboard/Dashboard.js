import React, { useContext, useEffect } from "react";
import "./dashboard.css";
import { TaskList, AddTask, SuccessAlert } from "../../components";
import AuthContext from "../../context/AuthContext/AuthContext";
import setToken from "../../utils/setToken";
import Navbar from "../../Layouts/Navbar/Navbar";
import { Container, Alert } from "reactstrap";
import Header from "../../Layouts/Header/Header";
if (localStorage.token) {
  setToken(localStorage.token);
}
const Dashboard = () => {
  const { getUser, token, msg } = useContext(AuthContext);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getUser();
    }
    return () => {
      mounted = false;
    };
  }, [token]);
  return (
    <div className="wrapper">
      <div className="one">
        <Container>
          <Navbar />
        </Container>
      </div>
      <div className="two">
        <Container>
          <Header />
        </Container>
      </div>
      <div className="three">
        <Container>
          <AddTask />
          <TaskList />
          {msg && <SuccessAlert />}
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
