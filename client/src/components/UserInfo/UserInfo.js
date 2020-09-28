import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import nameShortner from "../../utils/nameShortner";
import "./userinfo.css";
import * as Icon from "react-feather";

const UserInfo = () => {
  const { logoutUser, user } = useContext(AuthContext);
  return (
    <div className="userinfo">
      <p className="username mr-2">{user && nameShortner(user.fullname)}</p>
      <Icon.LogOut
        size={18}
        onClick={() => logoutUser()}
        className="logoutIcon"
      />
    </div>
  );
};

export default UserInfo;
