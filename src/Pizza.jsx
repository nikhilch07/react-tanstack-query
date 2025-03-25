import React from "react";

const Pizza = (props) => {
  return (
    <div className="pizza">
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <img src={props.image ? props.image : 'https://picsum.photos.com/150'} alt={props.name} />
    </div>
  );
};
export default Pizza;
