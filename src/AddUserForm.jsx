import React from 'react';
import Button from '@material-ui/core/Button';

const AddUserForm = (props) => {
  const { group, groupMembers, HandleViewChange, HandleNewGroupMember, HandleAddUserToGroup } = props;
  return (
      <h1>Add Group Member By Name</h1>
      <input type='text' onChange={HandleNewGroupMember}
   
  
    <Button onClick={() => {HandleAddUserToGroup}}>Add Group Member</Button>
    
  );
};


export default AddUserForm;