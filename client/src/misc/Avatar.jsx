import React from "react";

const Avatar = ({ image }) => {
  return (
    <>
      <img
        src={`/public/img/user/${image}`}
        className="nav__user-img"
        alt="No pic"
      />
    </>
  );
};

export default Avatar;
