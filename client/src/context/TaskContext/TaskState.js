import React, { useReducer } from "react";
import {
  GET_TASKS,
  GETTASKS_ERROR,
  REMOVE_TASK,
  SHOW_MODAL,
  HIDE_MODAL,
  ADD_TASK,
  ADDTASK_ERROR,
  CLEAR_TASKERRORS,
  MARK_COMPLETE,
  UPDATE_TASK,
  COMPLETED_TASK,
  UNCOMPLETED_TASK,
  SET_FILTER,
  EDIT_TASK,
  UPDATETASK_ERROR,
  CLEAR_EDIT,
  SEARCH_TASK,
  CLEAR_SEARCH,
} from "../types";
import TaskReducers from "../TaskContext/TaskReducers";
import TaskContext from "./TaskContext";
import Axios from "axios";
import setToken from "../../utils/setToken";

const TaskState = ({ children }) => {
  //initial task state
  const initialState = {
    tasks: [],
    taskErrors: null,
    modal: false,
    successMsg: null,
    filter: "All",
    filteredTasks: [],
    search: null,
    editAble: null,
  };
  const [state, dispatch] = useReducer(TaskReducers, initialState);

  //header configuration
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //getting tasks for loggedin user
  const getTasks = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    try {
      const res = await Axios.get("http://localhost:5000/api/tasks");
      dispatch({
        type: GET_TASKS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GETTASKS_ERROR,
        payload: error.response,
      });
    }
  };

  //addingTask
  const addTask = async (task) => {
    try {
      const res = await Axios.post(
        "http://localhost:5000/api/tasks",
        task,
        config
      );
      dispatch({
        type: ADD_TASK,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ADDTASK_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  //removeTasks
  const deleteTask = async (id) => {
    try {
      const res = await Axios.delete(`http://localhost:5000/api/tasks/${id}`);
      const msg = res.data.msg;
      dispatch({
        type: REMOVE_TASK,
        payload: { id, msg },
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  //updateTasks
  const updateTask = async (updatedTask) => {
    const { _id, task, isCompleted, dueDate } = updatedTask;
    try {
      const res = await Axios.put(
        `http://localhost:5000/api/tasks/${_id}`,
        {
          task: task,
          isCompleted: isCompleted,
          dueDate: dueDate,
        },
        config
      );
      dispatch({
        type: UPDATE_TASK,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATETASK_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  //editTask
  const editTask = (task) => {
    dispatch({
      type: EDIT_TASK,
      payload: task,
    });
  };

  //clearEdit
  const clearEdit = () => {
    dispatch({
      type: CLEAR_EDIT,
    });
  };

  //clearTaskErrors
  const clearTaskErrors = () => {
    dispatch({
      type: CLEAR_TASKERRORS,
    });
  };
  //mark task as complete and vice-versa
  const markComplete = (id) => {
    dispatch({
      type: MARK_COMPLETE,
      payload: id,
    });
  };

  //GET A COMPLETED TASK
  const getCompletedTasks = () => {
    dispatch({
      type: COMPLETED_TASK,
    });
  };
  //GET A COMPLETED TASK
  const getUncompletedTasks = () => {
    dispatch({
      type: UNCOMPLETED_TASK,
    });
  };

  //searchTask
  const searchTask = (searchText) => {
    dispatch({
      type: SEARCH_TASK,
      payload: searchText,
    });
  };

  //clearSearch
  const clearSearch = () => {
    dispatch({
      type: CLEAR_SEARCH,
    });
  };

  //SET FILTER
  const setFilter = (filter) => {
    dispatch({
      type: SET_FILTER,
      payload: filter,
    });
  };

  //showModal
  const showModal = () => {
    dispatch({
      type: SHOW_MODAL,
    });
  };

  //hidemodal
  const hideModal = () => {
    dispatch({
      type: HIDE_MODAL,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        modal: state.modal,
        taskErrors: state.taskErrors,
        successMsg: state.successMsg,
        filteredTasks: state.filteredTasks,
        editAble: state.editAble,
        filter: state.filter,
        search: state.search,
        getTasks,
        deleteTask,
        showModal,
        hideModal,
        addTask,
        updateTask,
        editTask,
        clearTaskErrors,
        clearEdit,
        markComplete,
        getCompletedTasks,
        getUncompletedTasks,
        setFilter,
        searchTask,
        clearSearch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskState;
