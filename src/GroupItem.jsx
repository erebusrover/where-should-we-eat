import React from 'react';


const GroupItem = (props) => {
  const {
    handleViewChange, groupName, handleGroupSetState, getGroupMembers, getGroupPricePoint
  } = props;
  const clickFunction = async () => {
    handleGroupSetState(groupName);
    await getGroupMembers(groupName);
    await getGroupPricePoint(groupName);
    await handleViewChange('group');
  };
  return (
      <div onClick={() => { clickFunction(); }}>
          <h2>{groupName}</h2>
      </div>

  );
};

export default GroupItem;
