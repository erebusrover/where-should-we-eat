import React from 'react';
import Button from '@material-ui/core/Button';
import OptionItem from './OptionItem.jsx';

const Options = (props) => {
  const { options, handlePass} = props;
  const { businesses } = options.data;
  console.log(businesses);
  return (
      <div>
          <h2>{}</h2>
          <div>{businesses.map((option) => (
                  <OptionItem key={option.id} option={option} className='option'/>
          ))}</div>
             <Button variant="contained" color="primary" onClick={() => { handlePass() }}>Pass</Button>
      </div>

  );
};

export default Options;
