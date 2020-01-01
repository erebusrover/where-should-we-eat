import React from 'react';
import GroupItem from './GroupItem.jsx';

const Home = (props) => {
  const { groups, HandleViewChange } = props;
  return (
<div>
{groups.map((group) => (<GroupItem group={group} HandleViewChange={HandleViewChange}/>))}
</div>
  );
};

export default Home;
