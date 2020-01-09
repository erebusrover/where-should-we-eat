import React from 'react';
import Button from '@material-ui/core/Button';
import RandomPlaceDisplay from './RandomPlaceDisplay.jsx';
// import OptionItem from './OptionItem.jsx';

/**
 * Renders five options from a Yelp API call for
 * places to eat based on the given parameters (either dietary restrictions from the database
 * or a user string in the Input form in the Group component).
 *
 */

const RandomPlace = (props) => {
  const { randomPlace, handlePass, handleChooseOption } = props;
  return (
    <div>
      <h2>{}</h2>
      <div>
        <RandomPlaceDisplay
          key={randomPlace.id}
          id={randomPlace.id}
          name={randomPlace.name}
          address={randomPlace.location.address1}
          city={randomPlace.location.city}
          state={randomPlace.location.state}
          zipCode={randomPlace.location.zip_code}
          price={randomPlace.price}
          rating={randomPlace.rating}
          imageUrl={randomPlace.image_url}
          phone={randomPlace.display_phone}
          is_closed={randomPlace.is_closed}
          url={randomPlace.url}
          lat={randomPlace.coordinates.latitude}
          lng={randomPlace.coordinates.longitude}
          className='randomPlace'
          handleChooseOption={handleChooseOption}
        />
      </div>
    </div>
  );
};

export default RandomPlace;