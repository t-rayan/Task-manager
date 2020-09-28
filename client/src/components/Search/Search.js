import React, { useContext, useRef } from "react";
import "./search.css";

import { Input } from "reactstrap";
import TaskContext from "../../context/TaskContext/TaskContext";

const Search = () => {
  const searchText = useRef("");
  const { searchTask, clearSearch } = useContext(TaskContext);

  //function to handle search
  const handleSearch = (e) => {
    if (searchText.current.value !== "") {
      searchTask(e.target.value);
    } else if (searchText.current.value === "") {
      clearSearch();
    }
  };
  return (
    <div className="searchForm">
      <Input
        ref={searchText}
        type="text"
        placeholder="Search your task"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
