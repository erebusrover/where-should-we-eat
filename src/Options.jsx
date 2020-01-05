import React from 'react';
import Button from '@material-ui/core/Button';
import OptionItem from './OptionItem.jsx';

const Options = (props) => {
  const { options, handlePass, handleChooseOption} = props;
  console.log(options);
  return (
      <div>
          <h2>{}</h2>
          <div>{options.map((option) => (
                  <OptionItem
                    key={option.id}
                    name={option.name}
                    price={option.price}
                    rating={option.rating}
                    image_url={option.image_url}
                    phone={option.display_phone}
                    is_closed={option.is_closed}
                    url={option.url}
                    lat={option.coordinates.latitude}
                    lng={option.coordinates.longitude}
                    className='option'
                    handleChooseOption={handleChooseOption}/>
          ))}</div>
             <Button variant="contained" color="primary" onClick={() => { handlePass(); }}>Pass</Button>
      </div>

  );
};

export default Options;
