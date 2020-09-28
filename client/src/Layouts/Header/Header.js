import React, { useContext } from "react";
import "./header.css";
import { Search } from "../../components";
import { Button } from "reactstrap";
import TaskContext from "../../context/TaskContext/TaskContext";
import * as Icon from "react-feather";

const Header = () => {
  const { showModal } = useContext(TaskContext);
  return (
    <div className="header">
      <Search />
      <Button
        color="primary"
        className="addBtn d-flex justify-content-between align-items-center"
        onClick={() => showModal()}
      >
        <Icon.Plus size={18} className="plusIcon mr-1" />
        <p className="mb-0">New </p>
      </Button>
    </div>
  );
};

export default Header;
