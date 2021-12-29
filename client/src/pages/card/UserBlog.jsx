import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import ShowCard from "./ShowCard";
import { AiFillSetting } from "react-icons/ai";
import { MdLocalPostOffice } from "react-icons/md";
import { NavLink } from "react-router-dom";

const UserBlog = () => {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(true);
  useEffect(() => {
    axios.get("/api/v1/posts/post/myPosts").then((res) => {
      // console.log(res.data.data.posts);
      setData(res.data.data.posts);
    });
  }, []);
  const handleActive2 = () => {
    setActive(false);
  };

  const handleActive1 = () => {
    setActive(true);
  };

  return (
    <>
      <div className="account__setting">
        <span
          onClick={handleActive1}
          className={`${
            active
              ? "account__setting__option act-active"
              : "account__setting__option"
          }`}
        >
          <MdLocalPostOffice className="account__icon" /> My Blogs
        </span>
        <span className="account__setting__option " onClick={handleActive2}>
          <NavLink to="/myAccount" className="link-style act_lnk">
            <AiFillSetting className="account__icon" /> Setting
          </NavLink>
        </span>
      </div>
      <div className="card__grid">
        {data.map((items) => {
          return (
            <ShowCard
              key={items._id}
              id={items._id}
              createdAt={items.createdAt}
              title={items.title}
              description={items.description}
              image={items.image}
              createdByName={items.user.name}
              createdByPhoto={items.user.photo}
              active={true}
            />
          );
        })}
      </div>
    </>
  );
};

export default UserBlog;
