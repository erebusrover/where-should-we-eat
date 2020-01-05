import React from 'react';
import GroupItem from './GroupItem.jsx';


const Home = (props) => {
  const {
    groups, handleViewChange, user, handleGroupSetState, getGroupMembers, userImages,
  } = props;
  return (
<div>
{groups.map((group) => <GroupItem groupName={group.groupName} userImages={userImages} handleViewChange={handleViewChange} handleGroupSetState={handleGroupSetState} getGroupMembers={getGroupMembers} />)}
<h1>hi {user}</h1>

</div>
  );
};

export default Home;
