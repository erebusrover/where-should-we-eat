import React from 'react';
import { Button } from '@material-ui/core';

const Title = (props) => {
  const { handleViewChange } = props;
  return (<div>
    <h1>Welcome to WSWE </h1>
    <h2>Please Create an Account</h2>
    <Button onClick={() => { handleViewChange('profile'); }}>Create an Account</Button>
</div>);
};
export default Title;
