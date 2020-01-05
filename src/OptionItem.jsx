import React from 'react';
import Button from '@material-ui/core/Button';


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
       <Button>We're eating here</Button>
       <h2>{price}</h2>
       <h2>{rating}</h2>
       <h2>Open? {is_closed}</h2>
       <h2>Phone: {phone}</h2>
       <img src={image_url}/>
      </div>
  );
};

export default OptionItem;
