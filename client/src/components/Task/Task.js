import React, { useContext } from "react";
import "./task.css";
import TaskContext from "../../context/TaskContext/TaskContext";
import toUpperCase from "../../utils/toUpperCase";
import * as Icon from "react-feather";
import Moment from "react-moment";
import { Badge } from "reactstrap";

const Task = ({ singleTask }) => {
  const { deleteTask, updateTask, editTask } = useContext(TaskContext);
  const { _id, task, isCompleted, dueDate } = singleTask;

  const handleRemove = () => {
    deleteTask(_id);
  };
  const handleCompleteTask = () => {
    updateTask({ ...singleTask, isCompleted: !isCompleted });
  };
  return (
    <div className="taskContainer ">
      <Icon.CheckCircle
        onClick={handleCompleteTask}
        size={22}
        className={isCompleted ? "completed" : "checkIcon"}
      />
      <div>
        <Badge
          pill
          className={`mb-2 px-2 py-1 ${
            isCompleted ? "completedBadge" : "pendingBadge"
          }`}
        >
          {isCompleted ? "Completed" : "Pending"}
        </Badge>
        <h6 className="title"> {toUpperCase(task)} </h6>
        <p className="date">
          <Moment format="MMM Do YY">{dueDate}</Moment>
        </p>
      </div>
      <div className="d-flex">
        <Icon.Edit
          size="18"
          className="editIcon"
          onClick={() => editTask(singleTask)}
        />
        <Icon.Trash className="trashIcon" size={18} onClick={handleRemove} />
      </div>
    </div>
  );
};

export default Task;
