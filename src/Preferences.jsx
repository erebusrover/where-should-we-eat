import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import { Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';



const PurpleRadio = withStyles({
  root: {
    color: deepPurple[400],
    '&$checked': {
      color: deepPurple[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

// TODO allow user to pick more than one dietary restriction
const Preferences = (props) => {
  const { handlePreferenceChange, handleLoginClick, handleSubmitPreferences, handleUserSettings, handleUserNameInput, handleDietaryRestrictionsSetState, handleUserStatusInput, handleSetState, userImages, userImage, user, userStatus, dietaryRestrictions, } = props;
  const onclick = () => {
   handleSubmitPreferences();
   handleLoginClick();
  }
  return (
    <div>
      <ul>
        <h1>Pick A User Name</h1>
        <input id='userName'type='text' onChange={handleUserNameInput}/>
        <h1>Select a User Image </h1>
        <RadioGroup row="true" aria-label="image" name="image">
          <img className='userImages' src={userImages.oppossum} width="130" height="121" border="5"/>
          <FormControlLabel className='radio'value={userImages.oppossum} control={<PurpleRadio color="#730099" />}onClick={() => handlePreferenceChange('image', userImages.oppossum)} />
          <img className='userImages' src={userImages.koala} width="130" height="121" border="5"/>
          <FormControlLabel className='radio'value={userImages.koala} control={<PurpleRadio color='#9900cc' />} onClick={() => handlePreferenceChange('image', userImages.koala)}/>
          <img className='userImages' src={userImages.bilby} width="130" height="121" border="5"/>
          <FormControlLabel className='radio'value={userImages.bilby} control={<PurpleRadio />} onClick={() => handlePreferenceChange('image', userImages.bilby)} />
          <img className='userImages' src={userImages.kangaroo} width="130" height="121" border="5"/>
          <FormControlLabel className='radio'value={userImages.kangaroo} control={<PurpleRadio />} onClick={() => handlePreferenceChange('image', userImages.kangaroo)} />
          <img className='userImages' src={userImages.sugarGlider} width="130" height="121" border="5"/>
          <FormControlLabel className='radio'value={userImages.sugarGlider} control={<PurpleRadio />} onClick={() => handlePreferenceChange('image', userImages.sugarGlider)} />
        </RadioGroup>
        <h2> Select Dietary Restricitons</h2>
        <RadioGroup defaultValue='none' aria-label="dietary restriction" name="dietary restriction">
          <FormControlLabel color='#9900cc' className='radio'value="Vegan" control={<Checkbox color='default' />} label="Vegan" onClick={() => handleDietaryRestrictionsSetState()}/>
          <FormControlLabel className='radio'value="Vegitarian" control={<Checkbox color='default' />} label="Vegitarian"onClick={() => handleDietaryRestrictionsSetState()} />
          <FormControlLabel className='radio'value="Kosher" control={<Checkbox color='default' />} label="Kosher" onClick={() => handleDietaryRestrictionsSetState()}/>
          <FormControlLabel className='radio'value="Gluten Free" control={<Checkbox color='default' />} label="Gluten Free"onClick={() => handleDietaryRestrictionsSetState()} />
          <FormControlLabel className='radio'value="Halal" control={<Checkbox color='default' />} label="Halal" onClick={() => handleDietaryRestrictionsSetState()} />
          <FormControlLabel className='radio'value="None" control={<Checkbox color='default' />} label="None" onClick={() => handleDietaryRestrictionsSetState()}/>
        </RadioGroup>
      <h1>Status</h1>
      <input id='status'type='text' onChange={handleUserStatusInput}/>
      </ul>
      <Button variant="contained" color="primary" onClick={()=> {onclick()}}>Submit & SignIn with Google</Button>
    </div>
  );
};

export default Preferences;
