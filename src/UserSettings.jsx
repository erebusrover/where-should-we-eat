import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
// TODO allow user to pick more than one dietary restriction
const UserSettings = (props) => {
 const {PreferenceChange} = props;
  return (
    <div>
      <ul>
        <h1>Select a User Image </h1>
        <RadioGroup aria-label="image" name="image">
          <FormControlLabel value="one" control={<Radio />} label="one" onClick={() => PreferenceChange('image', 'one')} />
          <FormControlLabel value="two" control={<Radio />} label="two" onClick={() => PreferenceChange('image', 'two')}/>
          <FormControlLabel value="three" control={<Radio />} label="three" onClick={() => PreferenceChange('image', 'three')} />
        </RadioGroup>
        <h2> Select Dietary Restricitons</h2>
        <RadioGroup aria-label="dietary restriction" name="dietary restriction">
          <FormControlLabel value="Vegan" control={<Radio />} label="Vegan" onClick={() => PreferenceChange('dietaryRestriction', 'Vegan')}/>
          <FormControlLabel value="Vegitarian" control={<Radio />} label="Vegitarian"onClick={() => PreferenceChange('dietaryRestriction', 'Vegitarian')} />
          <FormControlLabel value="Kosher" control={<Radio />} label="Kosher" onClick={() => PreferenceChange('dietaryRestriction', 'Kosher')}/>
          <FormControlLabel value="Gluten Free" control={<Radio />} label="Gluten Free"onClick={() => PreferenceChange('dietaryRestriction', 'Gluten Free')} />
          <FormControlLabel value="Halal" control={<Radio />} label="Halal" onClick={() => PreferenceChange('dietaryRestriction', 'Halal')} />
          <FormControlLabel value="None" control={<Radio />} label="None" onClick={() => PreferenceChange('dietaryRestriction', 'None')}/>
        </RadioGroup>
      <h1>Status</h1>
      <input type='text'/>
      </ul>
      <Button variant="contained" color="primary">Submit</Button>
    </div>
);
};

export default UserSettings;