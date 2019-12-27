import React from 'react';
import GroupItem from './GroupItem.jsx';

const Home = (props) => {
  const { groups } = props;
  return (
<div>
{groups.map((group) => (<GroupItem group={group}/>))}
</div>
  );
};

export default Home;
