import React from "react";

const CommentList = ({ comment, username, userphoto, createdAt }) => {
  const date = new Date(createdAt).toLocaleString("en-us", {
    month: "2-digit",
    year: "numeric",
    day: "2-digit",
  });
  return (
    <>
      <div>
        <img
          src={`/public/img/user/${userphoto}`}
          className="nav__user-img"
          alt="No pic"
        />{" "}
        <span className="d-ib comment__username">{username}</span>
      </div>
      <div className="comment_date">{date}</div>
      <div className="comment_text">{comment}</div>
      <div className="line comment-line">&nbsp;</div>
    </>
  );
};

export default CommentList;
