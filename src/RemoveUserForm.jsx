import React from 'react';
import Button from '@material-ui/core/Button';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

const RemoveUserForm = (props) => {
  const { handleNewGroupMember, handleViewChange, handleAddUserToGroup, users, user } = props;
  return (
      <div>
       
          <h1>Remove Group Member </h1>
          <FormControl variant="outlined">
            <InputLabel>User</InputLabel>
          <Select fullWidth='true'>  
          {users.data.map((user)=>(<MenuItem value={user.userName}>{user.userName}</MenuItem>))}
          </Select>
          </FormControl>
          <Button onClick={() => { handleAddUserToGroup(); }}>Remove Group Member</Button>
          <Button onClick={() => {handleViewChange('group')}}>Return to Group</Button>
      </div>
  );
};


export default RemoveUserForm;