import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
// TODO add in username imput box, add to UserSettings tooo
// TODO allow user to pick more than one dietary restriction
const Preferences = (props) => {
 const {preferenceChange} = props;
  return (
    <div>
      <ul>
        <h1>Select a User Image </h1>
        <RadioGroup aria-label="image" name="image">
          <FormControlLabel value="one" control={<Radio />} label="one" onClick={() => preferenceChange('image', 'one')} />
          <FormControlLabel value="two" control={<Radio />} label="two" onClick={() => preferenceChange('image', 'two')}/>
          <FormControlLabel value="three" control={<Radio />} label="three" onClick={() => preferenceChange('image', 'three')} />
        </RadioGroup>
        <h2> Select Dietary Restricitons</h2>
        <RadioGroup aria-label="dietary restriction" name="dietary restriction">
          <FormControlLabel value="Vegan" control={<Radio />} label="Vegan" onClick={() => preferenceChange('dietaryRestriction', 'Vegan')}/>
          <FormControlLabel value="Vegitarian" control={<Radio />} label="Vegitarian"onClick={() => preferenceChange('dietaryRestriction', 'Vegitarian')} />
          <FormControlLabel value="Kosher" control={<Radio />} label="Kosher" onClick={() => preferenceChange('dietaryRestriction', 'Kosher')}/>
          <FormControlLabel value="Gluten Free" control={<Radio />} label="Gluten Free"onClick={() => preferenceChange('dietaryRestriction', 'Gluten Free')} />
          <FormControlLabel value="Halal" control={<Radio />} label="Halal" onClick={() => preferenceChange('dietaryRestriction', 'Halal')} />
          <FormControlLabel value="None" control={<Radio />} label="None" onClick={() => preferenceChange('dietaryRestriction', 'None')}/>
        </RadioGroup>
      <h1>Status</h1>
      <input type='text'/>
      </ul>
      <Button variant="contained" color="primary">Submit</Button>
    </div>
);
};

export default Preferences;