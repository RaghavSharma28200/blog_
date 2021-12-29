import React from "react";
import { useHistory } from "react-router-dom";
import useForceUpdate from "use-force-update";

const Heading = () => {
  const history = useHistory();

  const checkUser = JSON.parse(localStorage.getItem("auth"));
  const forceUpdate = useForceUpdate();

  const handleBlogClick = () => {
    forceUpdate();
    if (checkUser) {
      history.push("/createBlog");
    } else {
      alert("Please Log in or sign in to get Access");
      // console.log("Please Log in or sign in to get Access");
    }
  };

  return (
    <>
      <div className="text-box-background">
        <div className="text-box">
          <h1 className="heading-primary">
            <span className="heading-primary-main">Blogger</span>
            <span className="heading-primary-sub">Create Your Blog Now!</span>
          </h1>
          <button onClick={handleBlogClick} className="btn-white btn-animated">
            Create Blog
          </button>
        </div>
      </div>
    </>
  );
};

export default Heading;
