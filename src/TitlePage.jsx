import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


/**
 * Rendered first. Prompts user to create an account.
 */

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const Title = (props) => {
  const classes = useStyles();
  const { handleViewChange } = props;
  return (<div style={{ color: '#d454ff' }}>
    <h1>WSWE</h1>
    <h3>Login</h3>
    <Button variant="contained" size="small" className={classes.margin} style={{ background: '#9900cc', color: 'white' }} onClick={() => { handleViewChange('profile'); }}>Login</Button>{' '}
    <div>{' '}
      <br />
      <h3>Create Account</h3>
      <Button variant="contained" size="small" className={classes.margin} style={{ background: '#9900cc', color: 'white' }} onClick={() => { handleViewChange('profile'); }}>Create Account</Button>
    </div>
  </div>);
};
export default Title;
