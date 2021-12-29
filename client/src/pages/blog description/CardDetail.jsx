import React from "react";
import { memo } from "react";
import { BsFillCalendarPlusFill } from "react-icons/bs";

const CardDetail = ({
  title,
  description,
  createdAt,
  image,
  createdByUser,
  createdByPhoto,
}) => {
  const date = new Date(createdAt).toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <>
      <div className="card__detail-wrapper">
        <div className="card__detail-img-wrapper">
          <img
            className="card__detail-img"
            src={`/public/img/post/${image}`}
            alt="No Pic"
          />
        </div>
        <div>
          <div className="card__detail-title heading-secondary">
            <h1 className="card__detail-title-h">{title}</h1>
          </div>
          <div className="card__detail-section">
            <div className="card__detail-userinfo">
              <div className="card__detail-dh heading-secondary">
                User Info:
              </div>
              <div className="card__detail-name">
                <img
                  className="nav__user-img"
                  src={`/public/img/user/${createdByPhoto}`}
                  alt=""
                />
                <span className="card__detail-username d-ib">
                  {createdByUser}
                </span>
              </div>
              <div className="card__detail-date">
                <span className="card__detail-date-t d-ib"> Created Date</span>
                <span className="card__detail-date d-ib">
                  {" "}
                  <BsFillCalendarPlusFill className="clr--g" />
                  {date}
                </span>
              </div>
            </div>
            <div className="card__detail-description">
              <div className="card__detail-dh heading-secondary">
                Description:
              </div>
              <div className="card__detail-description-d">{description}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(CardDetail);
