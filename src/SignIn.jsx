import React from 'react';

import Button from '@material-ui/core/Button';

const SignIn = (props) => {
  const { HandleSignInWithGoogle } = props;

  return (
        <Button color="inherit" onClick={HandleSignInWithGoogle} >Sign In With Google</Button>

  );
};


export default SignIn;
