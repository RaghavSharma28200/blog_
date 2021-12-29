import React from "react";
import ShowCard from "./ShowCard";

const Card = ({ data }) => {
  return (
    <>
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
              active={false}
            />
          );
        })}
      </div>
    </>
  );
};

export default Card;
