import React from 'react';
import { AppBar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
//! 13:00 https://www.youtube.com/watch?v=xm4LX5fJKZ8  moving these imports to the index file to get them out of the way

const Header = (props) => {
  const { handleViewChange, handleSignOutWithGoogle, handleSignInWithGoogle } = props;
  return (
  <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" className='one' color="inherit" aria-label="menu">
    </IconButton>
    <Typography variant="h6" className='two'>
      Where Should We Eat
    </Typography>
    <Button color="inherit" value='home' onClick={() => { handleViewChange('home'); }}>Home</Button>
    <Button color="inherit" value='login' onClick={() => { handleSignInWithGoogle(); }}>Login</Button>
    <Button color="inherit" value='profile' onClick={() => { handleViewChange('profile'); }}>Profile</Button>
    <Button color="inherit" value='profile' onClick={() => { handleViewChange('createGroup'); }}>Create Group</Button>
    <Button color="inherit" value='login' onClick={() => { handleSignOutWithGoogle();}}>LOGOUT</Button>
  </Toolbar>
</AppBar>

  );
};


export default Header;
