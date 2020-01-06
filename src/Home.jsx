import React from 'react';
import GroupItem from './GroupItem.jsx';
import './App.css';

const Home = (props) => {
  const {
    groups, handleViewChange, user, handleGroupSetState, userImage, getGroupMembers, getGroupPricePoint, userImages,
  } = props;
  return (
    <div>
      <h1>hi {user}!</h1>
      <Avatar src={userImage} />
      <h2>your groups:</h2>
        {groups.data.map((group) =>
            <GroupItem
              className="homeGroupItem"
              key={group.groupName}
              groupName={group.groupName}
              userImages={userImages}
              handleViewChange={handleViewChange}
              handleGroupSetState={handleGroupSetState}
              getGroupPricePoint={getGroupPricePoint}
              getGroupMembers={getGroupMembers} />)}
    </div>
  );
};

export default Home;
