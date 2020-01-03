import React from 'react';
import { Avatar } from '@material-ui/core';


const GroupMember = (props) => {
  const { groupMember, userImages } = props;
  return (
      <div>
        <Avatar src={userImages.kangaroo}/>
          <h2>{groupMember.userName}</h2>
          <h2>MemberStatus</h2>
      </div>

  );
};

export default GroupMember;