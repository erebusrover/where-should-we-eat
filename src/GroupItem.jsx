import React from 'react';


const GroupItem = (props) => {
  const {
    group, HandleViewChange, groupName, HandleGroupSetState, GetGroupMembers
  } = props;
  const clickFunction = () => {
    HandleGroupSetState(groupName);
    GetGroupMembers(groupName);
    HandleViewChange('group');
  };
  return (
      <div onClick={() => { clickFunction(); }}>
          <h2>{groupName}</h2>
      </div>

  );
};

export default GroupItem;
