import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoMdSend } from "react-icons/io";
import CommentList from "./CommentList";

const style = {
  bgcolor: "#edf5e1",
  p: 0,
  m: 0,
  boxShadow: 0,
};

const CommentComponent = ({
  comments,
  commentText,
  handleCommentChange,
  handleCommentClick,
}) => {
  const reverse = comments
    .map((items) => {
      return items;
    })
    .reverse();

  return (
    <>
      {" "}
      <div className="comment_wrapper">
        <Accordion sx={style}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Comments ({comments.length})</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <input
              type="text"
              className="form__input inp-comment"
              value={commentText}
              onChange={(e) => handleCommentChange(e)}
            />
            <button
              className="btn-comment"
              onClick={(e) => handleCommentClick(e)}
            >
              <IoMdSend />
            </button>
            <div className="comment_m-t">
              {reverse.map((items) => {
                return (
                  <CommentList
                    key={items._id}
                    comment={items.comment}
                    createdAt={items.createdAt}
                    username={items.user.name}
                    userphoto={items.user.photo}
                    comments={comments}
                  />
                );
              })}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default CommentComponent;
