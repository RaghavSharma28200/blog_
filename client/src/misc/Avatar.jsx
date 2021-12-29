import React from "react";

const Avatar = ({ image }) => {
  return (
    <>
      <img
        src={`http://localhost:8000/public/img/user/${image}`}
        className="nav__user-img"
        alt="No pic"
      />
    </>
  );
};

export default Avatar;
