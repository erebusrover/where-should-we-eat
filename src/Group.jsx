import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import GroupMember from './GroupMember.jsx';

const Group = (props) => {
  const {
    user, groupName, pricePoint, groupMembers, HandleViewChange, HandleGetOptions, Randomizer, choser, showWinner,
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
          ? <Button onClick={() => { HandleGetOptions(); HandleViewChange('options'); }}>Show Options</Button>
          : <h2></h2>}
        </div>

          <ul>
    {groupMembers.map((groupMember) => <GroupMember groupMember={groupMember} />)}
</ul>
    <Button onClick={() => { HandleViewChange('addUserToGroup'); }}>Add Group Member</Button>
    <Button onClick={() => { Randomizer(); }}>Start Game</Button>
      </div>

  );
};

// start button(appears only to creater)
// history button
// TODO toggle members list

export default Group;
