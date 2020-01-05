import React from 'react';


const OptionItem = (props) => {
  const {
    name,
    price,
    rating,
    image_url,
    phone,
    url,
    is_closed,
    lat,
    lng
  } = props;
  return (
      <div>
       <h1>{name}</h1>
       <button>We're eating here</button>
       <h2>{price}</h2>
       <h2>{rating}</h2>
       <h2>Open? {is_closed}</h2>
       <h2>Phone: {phone}</h2>
       <img src={image_url}/>
      </div>
  );
};

export default OptionItem;
