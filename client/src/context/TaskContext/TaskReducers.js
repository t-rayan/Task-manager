import {
  GET_TASKS,
  REMOVE_TASK,
  SHOW_MODAL,
  HIDE_MODAL,
  ADDTASK_ERROR,
  ADD_TASK,
  MARK_COMPLETE,
  UPDATE_TASK,
  COMPLETED_TASK,
  UNCOMPLETED_TASK,
  SET_FILTER,
  EDIT_TASK,
  CLEAR_EDIT,
  UPDATETASK_ERROR,
  CLEAR_TASKERRORS,
  SEARCH_TASK,
  CLEAR_SEARCH,
} from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload.newTask],
      };
    case ADDTASK_ERROR:
    case UPDATETASK_ERROR:
      console.log(payload);
      return {
        ...state,
        taskErrors: payload,
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
        filteredTasks: state.tasks,
      };
    case MARK_COMPLETE:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === payload
            ? { ...task, isCompleted: !task.isCompleted }
            : task
        ),
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === payload._id ? payload : task
        ),
      };
    case EDIT_TASK:
      return {
        ...state,
        modal: true,
        editAble: payload,
      };
    case CLEAR_EDIT:
      return {
        ...state,
        editAble: null,
      };
    case CLEAR_TASKERRORS:
      return {
        ...state,
        taskErrors: null,
      };
    case COMPLETED_TASK:
      return {
        ...state,
        filter: "completed",
        search: null,
      };
    case UNCOMPLETED_TASK:
      return {
        ...state,
        filter: "uncompleted",
        search: null,
      };
    case SET_FILTER:
      return {
        ...state,
        filter: payload,
      };
    case REMOVE_TASK:
      console.log(payload.msg);
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== payload),
        taskErrors: null,
        successMsg: payload.msg,
      };
    case SEARCH_TASK:
      const reg = new RegExp(`${payload}`, "gi");
      return {
        ...state,
        search: state.filteredTasks.filter((task) => task.task.match(reg)),
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        search: null,
        modal: true,
      };
    case SHOW_MODAL:
      return {
        ...state,
        modal: true,
      };
    case HIDE_MODAL:
      return {
        ...state,
        modal: false,
        editAble: null,
        taskErrors: null,
      };
    default:
      return state;
  }
};
