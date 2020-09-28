import React, { useContext, useEffect } from "react";
import "./tasklist.css";
import { Task } from "../../components";
import TaskContext from "../../context/TaskContext/TaskContext";
import setToken from "../../utils/setToken";

if (localStorage.token) {
  setToken(localStorage.token);
}
const TaskList = () => {
  const { getTasks, filteredTasks, tasks, filter, search } = useContext(
    TaskContext
  );
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getTasks();
    }
    return () => {
      mounted = false;
    };
  }, [tasks]);

  const searchedTasks =
    search !== null
      ? search.map((task) => <Task key={tasks._id} singleTask={task} />)
      : null;

  const allTasks = filteredTasks.map((task) => (
    <Task key={task._id} singleTask={task} />
  ));

  const completedTasks = filteredTasks
    .filter((task) => task.isCompleted === true)
    .map((task) => <Task key={task._id} singleTask={task} />);

  const uncompletedTasks = filteredTasks
    .filter((task) => task.isCompleted === false)
    .map((task) => <Task key={task._id} singleTask={task} />);

  // throwing layouts
  if (tasks === null) {
    return <div>Loading</div>;
  } else if (search !== null) {
    return <div className="task-container">{searchedTasks}</div>;
  } else if (filter === "All") {
    return <div className="task-container">{allTasks}</div>;
  } else if (filter === "completed") {
    return <div className="task-container">{completedTasks}</div>;
  } else if (filter === "uncompleted") {
    return <div className="task-container">{uncompletedTasks}</div>;
  }
};

export default TaskList;
