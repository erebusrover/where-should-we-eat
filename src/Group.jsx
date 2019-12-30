import React from 'react';
import GroupMember from './GroupMember.jsx'

const Group = (props) => {
  const { group, groupMembers } = props;
  return (
      <div>
          <h1>{group.groupName}</h1>
          <h2> PRICEPOINT $</h2>
          <h2>{group.pricePoint}</h2>
          <br />

          <h3>IMAGE GOES HERE</h3>
          <div>
    {groupMembers.map((group) => (<GroupMember  group={group}/>))}
</div>

      </div>

  );
};

// memberslist / toggle?
// start button(appears only to creater)
// history button
// TODO toggle members list

export default Group;
