import React from 'react';


const GroupItem = (props) => {
  const {
    handleViewChange, groupName, handleGroupSetState, getGroupMembers
  } = props;
  const clickFunction = () => {
    handleGroupSetState(groupName);
    getGroupMembers(groupName);
    handleViewChange('group');
  };
  return (
      <div onClick={() => { clickFunction(); }}>
          <h2>{groupName}</h2>
      </div>

  );
};

export default GroupItem;
