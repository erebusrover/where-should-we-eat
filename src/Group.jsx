import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import GroupMember from './GroupMember.jsx';

const Group = (props) => {
  const {
    user, groupName, pricePoint, groupMembers,
    handleViewChange, userImages, handleGetOptions, 
    choiceName, choiceLat, choiceLng, randomizer, chooser, showWinner,
    toggleDialog, open,
  } = props;
  return (
      <div>
        <h1>{groupName}</h1>
        <h2> PRICEPOINT $</h2>
        <h2>{pricePoint}</h2>
        <br />
        <div> {showWinner === true
          ? <h1>{chooser}</h1>
          : <h2>Start Game To See Winner</h2>}
        </div>
        <div> {user === chooser
          ? <Button onClick={() => { handleGetOptions(); }}>Show Options</Button>
          : <h2></h2>}
        </div>
      <Dialog onBackdropClick={() => { toggleDialog(); }} open={open}>
        <DialogTitle>{choiceName} has been chosen! Click here for directions.}</DialogTitle>
      </Dialog>
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
