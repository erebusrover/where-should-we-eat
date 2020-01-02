import React from 'react';


const GroupItem = (props) => {
  const { HandleViewChange, groupName } = props;
  return (
      <div onClick={() => { HandleViewChange('group'); }}>
          <h2>{groupName}</h2>
      </div>

  );
};

export default GroupItem;
