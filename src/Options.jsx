import React from 'react';
import OptionItem from './OptionItem.jsx';
import Button from '@material-ui/core/Button';

const Options = (props) => {
  const { options, handlePass} = props;
  return (
      <div>
          <h2>{}</h2>
          <div>{options.map((option) => (
                  <OptionItem option={option} className='option'/>
          ))}</div>
             <Button variant="contained" color="primary" onClick={() => { handlePass() }}>Pass</Button>
      </div>

  );
};

export default Options;
