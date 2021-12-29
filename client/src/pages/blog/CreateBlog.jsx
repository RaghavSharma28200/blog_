import React from "react";
import Blog from "./Blog";

const CreateBlog = () => {
  return (
    <>
      <Blog
        url={"/api/v1/posts"}
        req={"POST"}
        buttonText={" Create Blog"}
        headingText={"Create Your Blog"}
      />
    </>
  );
};

export default CreateBlog;
