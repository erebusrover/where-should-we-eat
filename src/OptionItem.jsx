import React from 'react';
import Button from '@material-ui/core/Button';


const OptionItem = (props) => {
  const {
    id,
    name,
    address,
    city,
    state,
    zipCode,
    price,
    rating,
    image_url,
    phone,
    url,
    is_closed,
    lat,
    lng,
    handleChooseOption,
  } = props;
  return (
      <div>
       <h1>{name}</h1>
       <Button onClick={ () => handleChooseOption(id, name, address, city, state, zipCode) }>We're eating here</Button>
       <h2>Price level: {price}</h2>
       <h2>Rating: {rating}</h2>
       <h2>Open? {is_closed}</h2>
       <h2>Phone: {phone}</h2>
       <img src={image_url}/>
      </div>
  );
};

export default OptionItem;
