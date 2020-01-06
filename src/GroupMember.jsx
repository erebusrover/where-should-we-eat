import React from 'react';
import { Avatar } from '@material-ui/core';


const GroupMember = (props) => {
  const { groupMember, userImages } = props;
  console.log(groupMember);
  return (
      <div>
        <h2><Avatar src={groupMember.image}/>
          {groupMember.userName}</h2>
          {/* <h2>{groupMember.status}</h2> */}
      </div>
  );
};

export default GroupMember;
