import React from 'react';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { TextField } from '@material-ui/core';
import { Container } from '@material-ui/core';

/**
 * This is rendered whn a user clicks on the Create Group button in the header.
 */

const PurpleRadio = withStyles({
  root: {
    color: deepPurple[400],
    '&$checked': {
      color: deepPurple[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const CreateGroup = props => {
  const {
    handleNewGroupName,
    handleNewGroupPricePoint,
    handleViewChange,
    handleNewGroupSubmit,
  } = props;
  const clickFunction = async () => {
    await handleNewGroupSubmit();
    await handleViewChange('home');
  };
  return (
    <Container>
      <br />
      <form>
        <h1>Group Name</h1>
        <TextField
          id="outlined-basic"
          label="Group Name"
          variant="outlined"
          onChange={handleNewGroupName}
        />
      </form>
      <h3> Select a Price </h3>
      <RadioGroup aria-label="dietary restriction" name="dietary restriction">
        <FormControlLabel
          value="$"
          control={<PurpleRadio />}
          label="$"
          onClick={() => handleNewGroupPricePoint('$')}
        />
        <FormControlLabel
          value="$$"
          control={<PurpleRadio />}
          label="$$"
          onClick={() => handleNewGroupPricePoint('$$')}
        />
        <FormControlLabel
          value="$$$"
          control={<PurpleRadio />}
          label="$$$"
          onClick={() => handleNewGroupPricePoint('$$$')}
        />
        <FormControlLabel
          value="$$$$"
          control={<PurpleRadio />}
          label="$$$$"
          onClick={() => handleNewGroupPricePoint('$$$$')}
        />
      </RadioGroup>
      <Button
        variant="outlined"
        style={{ background: '#9900cc', color: 'white' }}
        value="profile"
        onClick={() => clickFunction()}
      >
        Submit
      </Button>
    </Container>
  );
};

export default CreateGroup;
