import React from 'react';
import Button from '@material-ui/core/Button';

    const AddUserForm = (props) => {
      const { group, groupMembers, handleViewChange, handleNewGroupMember,handleAddUserToGroup } = props;
     
      return (
        <div>
          <h1>Add Group Member By Name</h1>
          <input type='text' onChange={handleNewGroupMember}/>
             <Button style={{ background: '#9900cc', color: 'white' }} onClick={() => { handleAddUserToGroup(); }}>Add Group Member</Button>
             <Button style={{ background: '#9900cc', color: 'white' }} onClick={() => { handleViewChange('group'); }}>Return to Group</Button>
        </div>
      );
};



export default AddUserForm;
