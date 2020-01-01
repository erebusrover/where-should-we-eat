import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import GroupMember from './GroupMember.jsx';

const Group = (props) => {
  const {
    groupName, pricePoint, groupMembers, HandleViewChange, HandleGetOptions,
  } = props;
  return (
      <div>
          <h1>{groupName}</h1>
          <h2> PRICEPOINT $</h2>
          <h2>{pricePoint}</h2>
          <br />

          <h3>IMAGE GOES HERE</h3>
          <ul>
    {groupMembers.map((groupMember) => <GroupMember groupMember={groupMember} />)}
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
