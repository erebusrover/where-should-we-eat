import React from 'react';
import Button from '@material-ui/core/Button';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

const RemoveUserForm = (props) => {
  this.props.groupMember = 'none';
  const { handleViewChange, handleRemoveUserFromGroup, users, user, tempMember } = props;
 
  return (
      <div>
       
          <h1>Remove Group Member </h1>
          <FormControl margin={1} style={{minWidth: 200}} variant="outlined">
            <InputLabel>User</InputLabel>
          <Select fullWidth='true' > 
          {users.data.map((user)=>(<MenuItem value={user.userName}>{user.userName}</MenuItem>))}
          </Select>
          </FormControl>
          <Button  style={{ background: '#9900cc', color:'white' }} onClick={() => { handleRemoveUserFromGroup(); }}>Remove Group Member</Button>
          <Button style={{ background: '#9900cc', color:'white' }} onClick={() => {handleViewChange('group')}}>Return to Group</Button>
      </div>
  );
};


export default RemoveUserForm;