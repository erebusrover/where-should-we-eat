import React from 'react';
import Button from '@material-ui/core/Button';
import UserItem from './UserItem.jsx';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

const AddUserForm = (props) => {
  const { handleNewGroupMember, user, users, handleAddUserToGroup, handleViewChange } = props;
  return (
      <div>
        <Select multiple='true' autoWidth='true' IconComponent='ArrowDropDownIcon'></Select>
          <h1>Add Group Member By Name</h1>
          <FormControl style={{minWidth: 160}} variant="outlined">
            <InputLabel>User</InputLabel>
          <Select fullWidth='true' value={user}>  
          {users.data.map((user)=>(<MenuItem>{user.userName}</MenuItem>))}
          </Select>
          </FormControl>
          <Button onClick={() => { handleAddUserToGroup(); }}>Add Group Member</Button>
          <Button onClick={() => {handleViewChange('group'); }}>Return to Group</Button>
      </div>
  );
};


export default AddUserForm;
