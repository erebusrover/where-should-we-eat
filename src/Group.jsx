import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import GroupMember from './GroupMember.jsx';

/**
 * we were attempting to make this stateful in order
 * to implement occasional rerendering of state based on changes to hte database
 */
class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: '',
    };
  }

  render() {
    const {
      user, groupName, pricePoint, groupMembers,
      handleViewChange, userImages, handleGetOptions,
      choiceName, choiceAddress, randomizer, chooser, showWinner,
      toggleDialog, directionsPopup, handleCategoriesInput,
    } = this.props;
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${choiceName} ${choiceAddress}`;
    return (
      <div>
        <h1>{groupName}</h1>
        <h2>Price point: {pricePoint}</h2>
        <br />
        <div> {showWinner === true
          ? <h1>{chooser} is the lucky Decision Maker</h1>
          : <div>
              <h2>Click Start Game to choose the Decision Maker</h2>
            </div>}
        </div>
        <div> {user === chooser
          ? <div>
              <input id='categories' type='text' onChange={handleCategoriesInput} />
              <Button style={{ background: '#9900cc', color: 'white' }} onClick={() => { handleGetOptions(); }}>Show Options</Button>
            </div>
          : <h2></h2>}
        </div>
      <Dialog onBackdropClick={() => { toggleDialog('directionsPopup'); }} open={directionsPopup}>
          <DialogTitle>{chooser} chose {choiceName}.</DialogTitle>
          <Link href={mapsUrl} target="_blank" rel="noreferrer">Click here for directions.</Link>
        </Dialog>
        <ul>
          {groupMembers.map((groupMember) => <GroupMember userImages={userImages} groupMember={groupMember} />)}
        </ul>
        <Button style={{ background: '#9900cc', color: 'white' }} onClick={() => { handleViewChange('addUserToGroup'); }}>Add Group Member</Button>
        <Button style={{ background: '#9900cc', color: 'white' }} onClick={() => { randomizer(); }}>Start Game</Button>
      </div>
    );
  }
}

export default Group;
