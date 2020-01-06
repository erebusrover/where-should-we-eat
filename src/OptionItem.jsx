import React from 'react';
import {
  Button, Card, CardActions, CardMedia, CardActionArea, Typography, CardContent,
} from '@material-ui/core/';


const OptionItem = (props) => {
  const {
    id, name, address, city, state,
    zipCode, price, rating, imageUrl,
    phone, handleChooseOption, url
  } = props;
  return (
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
              {rating} {price}
              <Typography variant="body2" color="textSecondary" component="p">
                {phone}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Button
          style={{ background: '#9900cc', color: 'white' }}
          onClick={ () => handleChooseOption(id, name, address, city, state, zipCode) }>
          We're eating here
        </Button>
      <Button
        style={{ background: '#9900cc', color: 'white' }}
        href={url} target="_blank" rel="noreferrer">
        Learn more
        </Button>
      </div>
  );
};

export default OptionItem;
