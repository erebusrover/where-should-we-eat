import React from 'react';
import Button from '@material-ui/core/Button';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

const RemoveUserForm = (props) => {
  this.props.groupMember = 'none';
  const { handleViewChange, handleRemoveUserFromGroup, handleNewGroupMember, users, user, tempMember } = props;
     
  return (
      <div>
       
          <h1>Remove Group Member By Name </h1>
          <input type='text' onChange={handleNewGroupMember}/>
          <Button style={{ background: '#9900cc', color: 'white' }} onClick={() => { handleRemoveUserFromGroup(); }}>Remove Group Member</Button>
          <br />
          <Button style={{ background: '#9900cc', color: 'white' }} onClick={() => {handleViewChange('group')}}>Return to Group</Button>
      </div>
  );
};


export default RemoveUserForm;