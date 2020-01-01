import React from 'react';
import GroupItem from './GroupItem.jsx';

const Home = (props) => {
  const { groups, HandleViewChange, GetGroupMembers } = props;
  return (
<div>
{/* {groups.map((group) => {
  return <GroupItem group={group} HandleViewChange={HandleViewChange} GetGroupMembers={GetGroupMembers} />;
})} */}

 <GroupItem group={groups[0]} HandleViewChange={HandleViewChange} />;

</div>
  );
};

export default Home;
