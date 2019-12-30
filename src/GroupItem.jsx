import React from 'react';


const GroupItem = (props) => {
  const { group, HandleViewChange } = props;
  return (
      <div onClick={() => { HandleViewChange('group'); }}>
          <h2>group name</h2>
          <h2>{group}</h2>
      </div>

  );
};

export default GroupItem;
