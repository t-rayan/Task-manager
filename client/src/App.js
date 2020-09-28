import React from "react";
import AuthState from "./context/AuthContext/AuthState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import setToken from "./utils/setToken";
import TaskState from "./context/TaskContext/TaskState";

if (localStorage.token) {
  setToken(localStorage.token);
}
function App() {
  return (
    <AuthState>
      <TaskState>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </Router>
        </div>
      </TaskState>
    </AuthState>
  );
}

export default App;
