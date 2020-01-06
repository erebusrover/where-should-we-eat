import React from 'react';
import Button from '@material-ui/core/Button';
// import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import GroupMember from './GroupMember.jsx';

const Group = (props) => {
  const {
    user, groupName, pricePoint, groupMembers,
    handleViewChange, userImages, handleGetOptions,
    choiceName, choiceAddress, randomizer, chooser, showWinner,
    toggleDialog, open,
  } = props;
  console.log(groupMembers);
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination="${choiceName} ${choiceAddress}"`;
  return (
      <div>
        <h1>{groupName}</h1>
        <h2>Price point: {pricePoint}</h2>
        <br />
        <div> {showWinner === true
          ? <h1>{chooser} is the lucky Decision Maker</h1>
          : <div>
              <h2>Click Start Game to choose the Decision Maker</h2>
              <Button onClick={() => { randomizer(); }}>Start Game</Button>
            </div>}
        </div>
        <div> {user === chooser
          ? <Button onClick={() => { handleGetOptions(); }}>See your options for a nearby restaurant</Button>
          : <div></div>}
        </div>
        <Dialog onBackdropClick={() => { toggleDialog(); }} open={open}>
          <DialogTitle>{chooser} chose {choiceName}.</DialogTitle>
          <Link href={mapsUrl} target="_blank" rel="noreferrer">Click here for directions.</Link>
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
