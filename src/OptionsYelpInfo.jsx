import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { Phone, Room } from '@material-ui/icons';

const YelpInfo = ({info}) => {
  const {
    id, name, address, city, state,
    zipCode, price, rating, imageUrl,
    phone, handleChooseOption, url
  } = info;

return (
<div>
  <div>
    <Phone fontSize="small" color="primary" />{' '}
    {phone}
  </div>
  <div>
    <Room fontSize="small" color="secondary" />{' '}
  {address}</div>
  <div>{price}</div>
  <Rating
    name="read-only"
    value={rating}
    readOnly
  />
  <div>
    <a
      href={url}
      target="_blank"
      style={{ color: 'red' }}
    >See {name} on Yelp!
    </a>
  </div>
</div>
)

};

export default YelpInfo;