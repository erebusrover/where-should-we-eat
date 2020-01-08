import React from 'react';
import {
  Button, Card, CardMedia, CardActionArea, Typography, CardContent, Container
} from '@material-ui/core/';
import YelpInfo from './OptionsYelpInfo.jsx';

/**
 *
 * Component for individual options for places to eat. Rendered as part of the Options
 * component when the 'winner'/decision maker clicks on the Show Options button from the Group
 * page once someone has clicked on the Start Game button.
 *
 * The user has the option to click on 'Learn More' to get more info about the place,
 * or 'We're Eating Here' to select a given place to eat. 'We're Eating Here' adds the loction to
 * the groupHistory table and introduces a popup message that will contain a link to Google Maps for directions
 * to the given place.
 */

const OptionItem = (props) => {
  const {
    id, name, address, city, state,
    zipCode, price, rating, imageUrl,
    phone, handleChooseOption, url
  } = props;
  return (
    <Container>
      <div>
        <Card maxWidth="345">
          <CardActionArea>
            <CardMedia height="140" width="100"
              backgr
              src={imageUrl}
              img="/static/images/cards/contemplative-reptile.jpg"
            />
            <img height="200" width="200" href={url} src={imageUrl} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              {name}
              </Typography>
        <Button
          style={{ background: '#9900cc', color: 'white' }}
          onClick={ () => handleChooseOption(id, name, address, city, state, zipCode) }>
          we're eating here
        </Button>
        {/* component here to display the card details  */}
        <YelpInfo info={props}/>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Container>
  );
};

export default OptionItem;
