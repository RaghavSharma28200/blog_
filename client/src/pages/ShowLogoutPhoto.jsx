import React from "react";
import { NavLink } from "react-router-dom";
import Avatar from "../misc/Avatar";

const ShowLogoutPhoto = ({ handleLogout, pic }) => {
  return (
    <>
      <li className="option_features logout-btn" onClick={handleLogout}>
        <NavLink to="#" className="link_style">
          Logout
        </NavLink>
      </li>
      <li className="option_features">
        <NavLink
          to={{
            pathname: "/myAccount",
          }}
          className="link_style"
        >
          <Avatar image={pic} />
        </NavLink>
      </li>
    </>
  );
};

export default ShowLogoutPhoto;
