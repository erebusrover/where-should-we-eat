import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
// TODO allow user to pick more than one dietary restriction
const Preferences = (props) => {
  const { preferenceChange, handleUserNameInput, handleUserStatusInput, handleSetState } = props;
  return (
    <div>
      <ul>
        <h1>Pick A User Name</h1>
        <input id='userName'type='text' onChange={handleUserNameInput}/>
        <h1>Select a User Image </h1>
        <RadioGroup aria-label="image" name="image">
          <FormControlLabel value="one" control={<Radio />} label="one" onClick={() => handleSetState('image', 'one')} />
          <FormControlLabel value="two" control={<Radio />} label="two" onClick={() => handleSetState('image', 'two')}/>
          <FormControlLabel value="three" control={<Radio />} label="three" onClick={() => handleSetState('image', 'three')} />
        </RadioGroup>
        <h2> Select Dietary Restricitons</h2>
        <RadioGroup aria-label="dietary restriction" name="dietary restriction">
          <FormControlLabel value="Vegan" control={<Radio />} label="Vegan" onClick={() => handleSetState('dietaryRestriction', 'Vegan')}/>
          <FormControlLabel value="Vegitarian" control={<Radio />} label="Vegitarian"onClick={() => handleSetState('dietaryRestriction', 'Vegitarian')} />
          <FormControlLabel value="Kosher" control={<Radio />} label="Kosher" onClick={() => handleSetState('dietaryRestriction', 'Kosher')}/>
          <FormControlLabel value="Gluten Free" control={<Radio />} label="Gluten Free"onClick={() => handleSetState('dietaryRestriction', 'Gluten Free')} />
          <FormControlLabel value="Halal" control={<Radio />} label="Halal" onClick={() => handleSetState('dietaryRestriction', 'Halal')} />
          <FormControlLabel value="None" control={<Radio />} label="None" onClick={() => handleSetState('dietaryRestriction', 'None')}/>
        </RadioGroup>
      <h1>Status</h1>
      <input id='status'type='text' onChange={handleUserStatusInput}/>
      </ul>
      <Button variant="contained" color="primary">Submit</Button>
    </div>
  );
};

export default Preferences;
