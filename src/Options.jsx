import React from 'react';
import OptionItem from './OptionItem.jsx';

const Options = (props) => {
  const { options } = props;
  return (
      <div>
          <h2>{}</h2>
          <div>{options.map((option) => (
                  <OptionItem option={option}/>
          ))}</div>
          <h2>This has rendered </h2>
      </div>

  );
};

export default Options;
