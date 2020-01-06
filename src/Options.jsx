import React from 'react';
import Button from '@material-ui/core/Button';
import OptionItem from './OptionItem.jsx';

const Options = (props) => {
  const { options, handlePass, handleChooseOption } = props;
  return (
      <div>
          <h2>{}</h2>
          <div>{options.map((option) => (
                  <OptionItem
                    key={option.id}
                    id={option.id}
                    name={option.name}
                    address={option.location.address1}
                    city={option.location.city}
                    state={option.location.state}
                    zipCode={option.location.zip_code}
                    price={option.price}
                    rating={option.rating}
                    imageUrl={option.image_url}
                    phone={option.display_phone}
                    is_closed={option.is_closed}
                    url={option.url}
                    lat={option.coordinates.latitude}
                    lng={option.coordinates.longitude}
                    className='option'
                    handleChooseOption={handleChooseOption}/>
          ))}</div>
      </div>
  );
};

export default Options;
