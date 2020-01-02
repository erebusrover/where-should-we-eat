import React from 'react';
import GroupItem from './GroupItem.jsx';

const Home = (props) => {
  const { groups, HandleViewChange, HandleGroupSetState, GetGroupMembers } = props;
  return (
<div>
{groups.map((group) => <GroupItem groupName={group.groupName} HandleViewChange={HandleViewChange} HandleGroupSetState={HandleGroupSetState} GetGroupMembers={GetGroupMembers} />)}
<h1>hi dot</h1>
</div>
  );
};
//! maybe try prop types again
export default Home;
