import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';

// TODO allow user to pick more than one dietary restriction
const Preferences = (props) => {
  const { preferenceChange, handleUserNameInput, handleUserStatusInput, handleSetState, userImages, } = props;
 
  return (
    <div>
      <ul>
        <h1>Pick A User Name</h1>
        <input id='userName'type='text' onChange={handleUserNameInput}/>
        <h1>Select a User Image </h1>
        <RadioGroup row="true" aria-label="image" name="image">
          <img className='userImages' src={userImages.oppossum} width="130" height="121"/>
          <FormControlLabel className='radio'value={userImages.oppossum} control={<Radio />}onClick={() => handleSetState('image', userImages.oppossum)} />
          <img className='userImages' src={userImages.koala} width="130" height="121"/>
          <FormControlLabel className='radio'value={userImages.koala} control={<Radio />} onClick={() => handleSetState('image', userImages.koala)}/>
          <img className='userImages' src={userImages.bilby} width="130" height="121"/>
          <FormControlLabel className='radio'value={userImages.bilby} control={<Radio />} onClick={() => handleSetState('image', userImages.bilby)} />
          <img className='userImages' src={userImages.kangaroo} width="130" height="121"/>
          <FormControlLabel className='radio'value={userImages.kangaroo} control={<Radio />} onClick={() => handleSetState('image', userImages.kangaroo)} />
          <img className='userImages' src={userImages.sugarGlider} width="130" height="121"/>
          <FormControlLabel className='radio'value={userImages.sugarGlider} control={<Radio />} onClick={() => handleSetState('image', userImages.sugarGlider)} />
        </RadioGroup>
        <h2> Select Dietary Restricitons</h2>
        <RadioGroup defaultValue='none' aria-label="dietary restriction" name="dietary restriction">
          <FormControlLabel className='radio'value="Vegan" control={<Radio />} label="Vegan" onClick={() => handleSetState('dietaryRestriction', 'Vegan')}/>
          <FormControlLabel className='radio'value="Vegitarian" control={<Radio />} label="Vegitarian"onClick={() => handleSetState('dietaryRestriction', 'Vegitarian')} />
          <FormControlLabel className='radio'value="Kosher" control={<Radio />} label="Kosher" onClick={() => handleSetState('dietaryRestriction', 'Kosher')}/>
          <FormControlLabel className='radio'value="Gluten Free" control={<Radio />} label="Gluten Free"onClick={() => handleSetState('dietaryRestriction', 'Gluten Free')} />
          <FormControlLabel className='radio'value="Halal" control={<Radio />} label="Halal" onClick={() => handleSetState('dietaryRestriction', 'Halal')} />
          <FormControlLabel className='radio'value="None" control={<Radio />} label="None" onClick={() => handleSetState('dietaryRestriction', 'None')}/>
        </RadioGroup>
      <h1>Status</h1>
      <input id='status'type='text' onChange={handleUserStatusInput}/>
      </ul>
      <Button variant="contained" color="primary">Submit</Button>
    </div>
  );
};

export default Preferences;
