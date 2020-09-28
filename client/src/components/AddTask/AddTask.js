import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import TaskContext from "../../context/TaskContext/TaskContext";

const AddTask = () => {
  const {
    modal,
    hideModal,
    addTask,
    taskErrors,
    editAble,
    clearEdit,
    updateTask,
    clearTaskErrors,
    showModal,
  } = useContext(TaskContext);
  const [newTask, setNewTask] = useState({ task: "", dueDate: "" });

  const { task } = newTask;

  //useEffect hook
  useEffect(() => {
    if (editAble !== null) {
      setNewTask(editAble);
    } else {
      setNewTask({ task: "", dueDate: Date.now() });
    }
  }, [editAble]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    clearTaskErrors();
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  //handle add task
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editAble === null) {
      addTask(newTask);
      if (!taskErrors) {
        hideModal();
      } else {
        showModal();
      }
    } else {
      updateTask(newTask);
      clearEdit();
      hideModal();
    }
    setNewTask({ task: "", dueDate: Date.now() });
  };

  return (
    <div>
      <Modal isOpen={modal} className="p-5" toggle={() => hideModal()}>
        <ModalHeader toggle={() => hideModal()} className="px-4 py-3">
          Add new task
        </ModalHeader>
        <ModalBody className="px-4 mt-3 mb-4">
          {taskErrors !== null && <Alert color="danger"> {taskErrors} </Alert>}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Task</Label>
              <Input
                type="text"
                name="task"
                value={task}
                onChange={handleChange}
                placeholder="Enter your task"
              />
            </FormGroup>
            <FormGroup>
              <Label for="dueDate">Due Date</Label>
              <Input type="date" name="dueDate" onChange={handleChange} />
            </FormGroup>

            <div className="mt-4">
              <Button color="primary">
                {editAble !== null ? "Update" : "Create"}
              </Button>
              <Button outline color="delete" onClick={() => hideModal()}>
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddTask;
