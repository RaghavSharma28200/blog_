import React from "react";
import { useParams } from "react-router-dom";
import Blog from "./Blog";

const UpdateBlog = () => {
  const { id } = useParams();

  return (
    <>
      <Blog
        url={`/api/v1/posts/${id}`}
        req={"PATCH"}
        buttonText={"Update Blog"}
        headingText={"Update Your Blog"}
      />
    </>
  );
};

export default UpdateBlog;
