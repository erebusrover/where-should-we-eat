import React from 'react';
import GroupItem from './GroupItem.jsx';

const Home = (props) => {
  const { groups, HandleViewChange } = props;
  return (
<div>
{groups.map((group) => <GroupItem groupName={group.groupName} HandleViewChange={HandleViewChange} />)}
<h1>hi dot</h1>
</div>
  );
};
//! maybe try prop types again
export default Home;
