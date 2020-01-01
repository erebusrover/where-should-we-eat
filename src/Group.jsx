import React from 'react';
import Button from '@material-ui/core/Button';
import GroupMember from './GroupMember.jsx';

const Group = (props) => {
  const { group, groupMembers, HandleViewChange } = props;
  return (
      <div>
          <h1>{group.groupName}</h1>
          <h2> PRICEPOINT $</h2>
          <h2>{group.pricePoint}</h2>
          <br />

          <h3>IMAGE GOES HERE</h3>
          <div>
    {groupMembers.map((groupMember) => {
      // eslint-disable-next-line react/jsx-key
      return (<GroupMember groupMember={groupMember} />);
    })}
</div>
    <Button onClick={() => { HandleViewChange('addUserToGroup'); }}>Add Group Member</Button>
    <Button onClick={() => { HandleViewChange('options'); }}>Start Game</Button>
      </div>

  );
};

// memberslist / toggle?
// start button(appears only to creater)
// history button
// TODO toggle members list

export default Group;
