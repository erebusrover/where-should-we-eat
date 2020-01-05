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
    display_phone,
    lat,
    lng
  } = props;
  return (
      <div>
       <h1>{name}</h1>
       <h2>{price}</h2>
       <h2>{rating}</h2>
       <h2>{phone}</h2>
       <h2>Open? {is_closed}</h2>
       <h2>Phone: {display_phone}</h2>
       <img src={image_url}/>
      </div>
  );
};

export default OptionItem;
