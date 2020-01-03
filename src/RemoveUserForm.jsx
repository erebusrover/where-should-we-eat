import React from 'react';
import Button from '@material-ui/core/Button';

const RemoveUserForm = (props) => {
  const { handleNewGroupMember, handleAddUserToGroup } = props;
  return (
      <div>
          <h1>Add Group Member By Name</h1>
          <input type='text' onChange={handleNewGroupMember}/>
          <Button onClick={() => { handleAddUserToGroup(); }}>Remove Group Member</Button>
      </div>
  );
};


export default RemoveUserForm;