import React from 'react';
import Button from '@material-ui/core/Button';

const AddUserForm = (props) => {
  const { HandleNewGroupMember, HandleAddUserToGroup } = props;
  return (
      <div>
          <h1>Add Group Member By Name</h1>
          <input type='text' onChange={HandleNewGroupMember}/>
         <Button onClick={() => { HandleAddUserToGroup(); }}>Add Group Member</Button>
      </div>
  );
};


export default AddUserForm;
