import React from 'react';
import Button from '@material-ui/core/Button';
import GroupMember from './GroupMember.jsx';
import PropTypes from 'prop-types';

const Group = (props) => {
  const { group, groupMembers, GetGroupMembers, HandleViewChange, HandleGetOptions } = props;
  return (
      <div>
          <h1>{group.groupName}</h1>
          <h2> PRICEPOINT $</h2>
          <h2>{group.pricePoint}</h2>
          <br />

          <h3>IMAGE GOES HERE</h3>
          <ul>
    {groupMembers.map((groupMember) => {
      return (<GroupMember groupMember={groupMember} />);
    })}
</ul>
    <Button onClick={() => { HandleViewChange('addUserToGroup'); }}>Add Group Member</Button>
    <Button onClick={() => { HandleGetOptions(); HandleViewChange('options'); }}>Start Game</Button>
      </div>

  );
};

// start button(appears only to creater)
// history button
// TODO toggle members list

export default Group;
