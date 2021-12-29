import axios from "axios";
import React, { memo, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Loader } from "rsuite";
import CardDetail from "./CardDetail";
import CommentComponent from "./CommentComponent";

const Description = () => {
  const [data, setData] = useState("");
  const [userData, setUserData] = useState("");
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setloading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/v1/posts/${id}`).then((res) => {
      // console.log(res.data.data.post.comments);
      setData(res.data.data.post);
      setUserData(res.data.data.post.user);
      setComments(res.data.data.post.comments);
      setloading(false);
    });
  }, [id]);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };
  const checkUser = JSON.parse(localStorage.getItem("auth"));
  const handleCommentClick = async (e) => {
    if (checkUser) {
      const url = "/api/v1/comments/";
      const data = {
        comment: commentText,
        post: id,
      };
      await axios.post(url, data);
      const updateComment = await axios.get(`/api/v1/posts/${id}`);
      setComments(updateComment.data.data.post.comments);
    } else {
      alert("Log in or sign in to get access");
    }

    // console.log(res);
  };

  return (
    <>
      {loading && <Loader content="loading...." center vertical />}
      {!loading && (
        <div className="card__detail-bg">
          <CardDetail
            title={data.title}
            description={data.description}
            createdAt={data.createdAt}
            image={data.image}
            createdByUser={userData.name}
            createdByPhoto={userData.photo}
          />
          <CommentComponent
            comments={comments}
            commentText={commentText}
            handleCommentChange={handleCommentChange}
            handleCommentClick={handleCommentClick}
          />
        </div>
      )}
    </>
  );
};

export default memo(Description);
