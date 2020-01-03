import React from 'react';

import Button from '@material-ui/core/Button';

const SignIn = (props) => {
  const { handleSignInWithGoogle } = props;

  return (
        <Button color="inherit" onClick={handleSignInWithGoogle} >Sign In With Google</Button>

  );
};


export default SignIn;
