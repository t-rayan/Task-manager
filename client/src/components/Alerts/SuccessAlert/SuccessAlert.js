import React, { useContext, useState } from "react";
import * as Rstrap from "reactstrap";
import AuthContext from "../../../context/AuthContext/AuthContext";
const SuccessAlert = () => {
  const { msg, clearMsg } = useContext(AuthContext);
  const [visible, setVisible] = useState(true);
  const onDismiss = () => {
    clearMsg();
    setVisible(false);
  };
  return (
    <React.Fragment>
      {msg ? (
        <Rstrap.Alert color="success" isOpen={visible} toggle={onDismiss}>
          {msg}
        </Rstrap.Alert>
      ) : null}
    </React.Fragment>
  );
};

export default SuccessAlert;
