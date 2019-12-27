import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'
const Preferences = () => (
    <div>
      <ul>
        <h1>Select a User Image </h1>
        <RadioGroup aria-label="image" name="image">
          <FormControlLabel value="one"  control={<Radio />} label="one" />
          <FormControlLabel value="two" control={<Radio />} label="two" />
          <FormControlLabel value="three" control={<Radio />} label="three" />
        </RadioGroup>
        <h2> Select Dietary Restricitons</h2>
        <RadioGroup aria-label="dietary restriction" name="dietary restriction">
          <FormControlLabel value="one"  control={<Radio />} label="Vegan" />
          <FormControlLabel value="two" control={<Radio />} label="Vagitarian" />
          <FormControlLabel value="three" control={<Radio />} label="Kosher" />
          <FormControlLabel value="three" control={<Radio />} label="Gluten Free" />
          <FormControlLabel value="three" control={<Radio />} label="Halal" />
          <FormControlLabel value="three" control={<Radio />} label="None" />
        </RadioGroup>
        <h3> Select a Price </h3>
        <RadioGroup aria-label="dietary restriction" name="dietary restriction">
          <FormControlLabel value="one"  control={<Radio />} label="$" />
          <FormControlLabel value="two" control={<Radio />} label="$$" />
          <FormControlLabel value="three" control={<Radio />} label="$$$" />
          <FormControlLabel value="three" control={<Radio />} label="$$$$" />
        </RadioGroup>
      </ul>
      <Button variant="contained" color="primary">Submit</Button>
    </div>
  );

  export default Preferences;