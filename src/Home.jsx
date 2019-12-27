import React from 'react';
import GroupItem from './GroupItem'

const Home = (props) => {
  const {groups} = props
  return (
<div>
{groups.map(group => {
    return (<GroupItem group={group}/>)
})}
</div>
 )
}

export default Home;