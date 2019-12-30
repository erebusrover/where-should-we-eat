import React from 'react';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const CreateGroup = (props) => {
  const { HandleViewChange } = props;
  return (
      <div>
          <br />
          <h1>Group Name</h1>
          <input type='text'></input>
             <h3> Select a Price </h3>
        <RadioGroup aria-label="dietary restriction" name="dietary restriction">
          <FormControlLabel value="$" control={<Radio />} label="$" />
          <FormControlLabel value="$$" control={<Radio />} label="$$" />
          <FormControlLabel value="$$$" control={<Radio />} label="$$$" />
          <FormControlLabel value="$$$$" control={<Radio />} label="$$$$" />
        </RadioGroup>
        <Button color="inherit" value='profile' onClick={() => { HandleViewChange('home'); }}>Submit</Button>
      </div>

  );
};

export default CreateGroup;
