import React from 'react';
import Button from '@material-ui/core/Button';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

const UserItem = (props) => {
  const { user } = props;
  return (
     <MenuItem>({user})</MenuItem>)

};


export default UserItem;
