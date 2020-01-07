import React from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

/**
 * 
 * This is rendered when a user clicks 'Add Group Member' from the Group page
 */

const AddUserForm = (props) => {
  const {
    handleViewChange, handleNewGroupMember, handleAddUserToGroup,
  } = props;
  const clickFunction = () => {
    handleAddUserToGroup();
    handleViewChange('group');
  };
  return (
    <div>
      <h1>Add Group Member By Name</h1>
      <TextField id="groupMemberName" label="Group Member Name" variant="outlined" onChange={handleNewGroupMember} />
      {/* <Button variant="contained" color="primary" onClick={() => {
        clickFunction();
      }}>
        Add Group Member
</Button> */}
      <Button style={{ background: '#9900cc', color: 'white' }} onClick={() => { clickFunction(); }}>Add Group Member</Button>
    </div>
  );
};


export default AddUserForm;
