import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineSystemUpdateAlt, MdDelete } from "react-icons/md";
import { BsFillCalendarPlusFill } from "react-icons/bs";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ShowCard = ({
  id,
  title,
  image,
  createdAt,
  createdByName,
  createdByPhoto,
  description,
  active,
}) => {
  const shortDescription = `${description
    .split(" ")
    .slice(0, 5)
    .join(" ")
    .replace(/<.+?>/g, "")}...`;
  const date = new Date(createdAt).toLocaleString("en-us", {
    month: "2-digit",
    year: "numeric",
    day: "2-digit",
  });

  const history = useHistory();

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are You Sure You Want To delete these blog"
    );

    if (confirm) {
      await axios.delete(`/api/v1/posts/${id}`);
      alert("post deleted sucessfully");
      history.push("/myAccount");
      // console.log(res);
    }
    return;
  };
  return (
    <>
      <div className="card-wrapper">
        <div className="card__img-wrapper">
          <div className="card__overlay">&nbsp;</div>
          <img
            className="card__image"
            src={`/public/img/post/${image}`}
            alt="No img"
          />
        </div>
        <div className="card__detail">
          <p className="card__title">{title}</p>
          <p className="card__name mr-t-b">{createdByName}</p>
          <p className="card__date mr-t-b ">
            <BsFillCalendarPlusFill className="clr--g" />
            {date}
          </p>
          <p className="card__description">{shortDescription}</p>
        </div>{" "}
        <div className="card__button">
          <NavLink to={`/blogDetail/${id}`} className="link_style">
            <button className="btn btn--green">Detail</button>
          </NavLink>
          {active && (
            <>
              <span className="card__options">
                <NavLink to={`/updateBlog/${id}`} className="act_lnk">
                  <span className="mr-r">
                    <MdOutlineSystemUpdateAlt />
                  </span>
                </NavLink>
                <span onClick={handleDelete}>
                  <MdDelete />
                </span>
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowCard;
