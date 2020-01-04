import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import GroupMember from './GroupMember.jsx';

const Group = (props) => {
  const {
    user, groupName, pricePoint, groupMembers, handleViewChange, userImages, handleGetOptions, randomizer, choser, showWinner,
  } = props;
  return (
      <div>
          <h1>{groupName}</h1>
          <h2> PRICEPOINT $</h2>
          <h2>{pricePoint}</h2>
          <br />
          <div> {showWinner === true
            ? <h1>{choser}</h1>
            : <h2>Start Game To See Winner</h2>}
        </div>
        <div> {user === choser
          ? <Button onClick={() => { handleGetOptions(); handleViewChange('options'); }}>Show Options</Button>
          : <h2></h2>}
        </div>

          <ul>
    {groupMembers.map((groupMember) => <GroupMember userImages={userImages} groupMember={groupMember} />)}
</ul>
    <Button onClick={() => { handleViewChange('addUserToGroup'); }}>Add Group Member</Button>
    <Button onClick={() => { handleViewChange('removeUserFromGroup'); }}>Remove Group Member</Button>
    <Button onClick={() => { randomizer(); }}>Start Game</Button>
      </div>

  );
};

// history button
// TODO toggle members list

export default Group;
