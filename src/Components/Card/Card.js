import React from "react";


const Card = props => (
  <div className="card" onClick={props.onClick}><img className="img" src={props.imgsrc} alt={props.id}/></div>
);

export default Card;