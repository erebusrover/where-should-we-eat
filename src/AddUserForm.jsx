import React from 'react';
import Button from '@material-ui/core/Button';

const AddUserForm = (props) => {
  const { handleNewGroupMember, handleAddUserToGroup } = props;
  return (
      <div>
          <h1>Add Group Member By Name</h1>
          <input type='text' onChange={handleNewGroupMember}/>
         <Button onClick={() => { handleAddUserToGroup(); }}>Add Group Member</Button>
      </div>
  );
};


export default AddUserForm;
