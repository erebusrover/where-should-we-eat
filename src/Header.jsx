import React from 'react';
import { AppBar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
//! 13:00 https://www.youtube.com/watch?v=xm4LX5fJKZ8  moving these imports to the index file to get them out of the way

const Header = (props) => {
  const { handleViewChange, handleSignOutWithGoogle } = props;
  return (
  <AppBar style={{ background: '#9900cc'}} position="static">
  <Toolbar>
    <IconButton edge="start" className='one' color="inherit" aria-label="menu">
    </IconButton>
        <Typography padding={10} margin={5} variant="h5" className='two'>
      Where Should We Eat?
    </Typography>{'  '}
        {' '}<Button style={{ background: '#9900cc', color: 'white' }} value='home' onClick={() => { handleViewChange('home'); }}>home</Button>{' '}
    {/* <Button color="inherit" value='login' onClick={
      () => { handleSignInWithGoogle(); }}>Login</Button> */}
        <Button style={{ background: '#9900cc', color: 'white' }} value='profile' onClick={() => { handleViewChange('createGroup'); }}>groups</Button>{' '}
        <Button style={{ background: '#9900cc', color: 'white' }} value='login' onClick={() => { handleSignOutWithGoogle(); }}>logout</Button>{' '}
  </Toolbar>
</AppBar>

  );
};


export default Header;
