import React from 'react';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
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
})((props) => <Radio color="default" {...props} />); 

const CreateGroup = (props) => {
  const { handleNewGroupName, handleNewGroupPricePoint, handleNewGroupSubmit } = props;
  return (
      <div>
          <br />
          <form>

          <h1>Group Name</h1>
          <input type='text' onChange={handleNewGroupName}></input>
          </form>
             <h3> Select a Price </h3>
        <RadioGroup aria-label="dietary restriction" name="dietary restriction">
          <FormControlLabel value="$" control={<PurpleRadio />} label="$" onClick={() => handleNewGroupPricePoint( '$')} />
          <FormControlLabel value="$$" control={<PurpleRadio />} label="$$" onClick={() => handleNewGroupPricePoint( '$$')}  />
          <FormControlLabel value="$$$" control={<PurpleRadio />} label="$$$" onClick={() => handleNewGroupPricePoint( '$$$')} />
          <FormControlLabel value="$$$$" control={<PurpleRadio />} label="$$$$" onClick={() => handleNewGroupPricePoint( '$$$$')} />
        </RadioGroup>
        <Button variant="outlined" style={{ background: '#9900cc', color:'white' }} value='profile' onClick={() => handleNewGroupSubmit()}>Submit</Button>
        {/* //TODO user needs feedback on submit */}
      </div>

  );
};

export default CreateGroup;
