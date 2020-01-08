import React from 'react';
import { Button } from '@material-ui/core';

/**
 * Rendered first. Prompts user to create an account.
 */

const Title = (props) => {
  const { handleViewChange } = props;
  return (<div style={{ color: '#d454ff' }}>
    <h1>WSWE</h1>
    <h3>Login</h3>
    <Button style={{ background: '#9900cc', color: 'white' }} onClick={() => { handleViewChange('profile'); }}>Login</Button>{' '}
    <div>{' '}
    <br />
    <h3>Create Account</h3>
    <Button style={{ background: '#9900cc', color: 'white' }} onClick={() => { handleViewChange('profile'); }}>Create Account</Button>
    </div>
</div>);
};
export default Title;
