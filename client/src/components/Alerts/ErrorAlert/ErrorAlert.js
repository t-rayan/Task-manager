import React, { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import { Alert } from "reactstrap";
const ErrorAlert = () => {
  const { errors, clearErrors } = useContext(AuthContext);
  const [visible] = useState(true);
  const onDismiss = () => clearErrors();

  return (
    <div>
      {errors && (
        <Alert
          color="danger"
          isOpen={visible}
          toggle={onDismiss}
          className="alertType"
        >
          {errors.data.msg}
        </Alert>
      )}
    </div>
  );
};

export default ErrorAlert;
