import React from 'react';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const CreateGroup = (props) => {
  const { HandleViewChange, HandleNewGroupName, HandleNewGroupPricePoint } = props;
  return (
      <div>
          <br />
          <form>

          <h1>Group Name</h1>
          <input type='text' onChange={HandleNewGroupName}></input>
          </form>
             <h3> Select a Price </h3>
        <RadioGroup aria-label="dietary restriction" name="dietary restriction">
          <FormControlLabel value="$" control={<Radio />} label="$" onClick={() => HandleNewGroupPricePoint( '$')} />
          <FormControlLabel value="$$" control={<Radio />} label="$$" onClick={() => HandleNewGroupPricePoint( '$$')}  />
          <FormControlLabel value="$$$" control={<Radio />} label="$$$" onClick={() => HandleNewGroupPricePoint( '$$$')} />
          <FormControlLabel value="$$$$" control={<Radio />} label="$$$$" onClick={() => HandleNewGroupPricePoint( '$$$$')} />
        </RadioGroup>
        {/* //! user needs feedback on submit */}
        <Button color="inherit" value='profile' onClick={() => { HandleViewChange('home'); }}>Submit</Button>
      </div>

  );
};

export default CreateGroup;
