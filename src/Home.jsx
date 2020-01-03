import React from 'react';
import GroupItem from './GroupItem.jsx';

const Home = (props) => {
  const { groups, handleViewChange, handleGroupSetState, getGroupMembers } = props;
  return (
<div>
{groups.map((group) => <GroupItem groupName={group.groupName} handleViewChange={handleViewChange} handleGroupSetState={handleGroupSetState} getGroupMembers={getGroupMembers} />)}
<h1>hi dot</h1>
</div>
  );
};
//! maybe try prop types again
export default Home;
