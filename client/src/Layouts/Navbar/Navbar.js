import React, { useContext, useState } from "react";
import { UserInfo } from "../../components";
import TaskContext from "../../context/TaskContext/TaskContext";
import "./navbar.css";
import * as Icon from "react-feather";

const Navbar = () => {
  const {
    getCompletedTasks,
    getUncompletedTasks,
    setFilter,
    filter,
  } = useContext(TaskContext);
  const [toggleMenu, setToggleMenu] = useState(false);

  const changeFilter = (e) => {
    setFilter(e.target.innerHTML);
  };
  const handleMenu = (e) => {
    e.preventDefault();
    setToggleMenu(!toggleMenu);
  };
  return (
    <nav className="navbar">
      <div className="logo-container">
        <h3 className="logo">Todoz</h3>
      </div>
      <div className="menuIcons" onClick={handleMenu}>
        {toggleMenu ? <Icon.X /> : <Icon.Menu />}
      </div>
      <ul className="menuLinks">
        <li
          className={`link ${filter === "All" ? "active" : ""}`}
          onClick={changeFilter}
        >
          All
        </li>
        <li
          className={`link ${filter === "completed" ? "active" : ""}`}
          onClick={getCompletedTasks}
        >
          Completed
        </li>
        <li
          className={`link ${filter === "uncompleted" ? "active" : ""}`}
          onClick={getUncompletedTasks}
        >
          Uncompleted
        </li>
      </ul>

      <UserInfo />
    </nav>
  );
};

export default Navbar;
