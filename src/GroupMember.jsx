import React from 'react';
import { Avatar } from '@material-ui/core';


const GroupMember = (props) => {
  const { groupMember, userImages } = props;
  return (
      <div>
        {/* <h2><Avatar src={userImages.kangaroo}/> */}
        {/* // TODO to use avatar we need a get user image from database function  */}
          <h2>{groupMember.userName}</h2>
      </div>

  );
};

export default GroupMember;