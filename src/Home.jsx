import React from 'react';
import { Avatar } from '@material-ui/core';
import GroupItem from './GroupItem.jsx';


const Home = (props) => {
  const {
    groups, handleViewChange, user, userImage, handleGroupSetState, getGroupMembers, getGroupPricePoint, userImages,
  } = props;
  return (
    <div>
      <h1>hi {user}</h1>
      <Avatar src={userImage}/>

      <div>
      {groups.data.map((group) => <GroupItem
          groupName={group.groupName}
          userImages={userImages}
          handleViewChange={handleViewChange}
          handleGroupSetState={handleGroupSetState}
          getGroupPricePoint={getGroupPricePoint}
          getGroupMembers={getGroupMembers} />)}

          </div>
    </div>
  );
};

export default Home;
