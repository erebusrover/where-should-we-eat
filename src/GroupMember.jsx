import React from 'react';
import { Avatar } from '@material-ui/core';


const GroupMember = (props) => {
  const { groupMember, userImages } = props;
  return (
      <div>
        <h2><Avatar src={userImages.kangaroo}/>
          {groupMember.userName}</h2>
      </div>

  );
};

export default GroupMember;