import React from 'react';
import { Avatar } from '@material-ui/core';

/**
 * Each GroupMember is a current member of a given group.
 * They're rendered whenever a Group page for a given Group is rendered.
 * The user that creates a group is automatically added to the group.
 */

const GroupMember = (props) => {
  const { groupMember} = props;
  return (
      <div>
      <h3 style={{ color: '#d454ff' }}>
          {groupMember.userName}</h3>
          {/* <h2>{groupMember.status}</h2> */}
      </div>
  );
};

export default GroupMember;
