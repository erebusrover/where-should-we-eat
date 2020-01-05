import React from 'react';


const OptionItem = (props) => {
  const { option } = props;
  return (
      <div>
       <h1>Restaurant Name</h1>
       <h2>price</h2>
       <h2>rating</h2>
       <h2>catagories</h2>
       <h2> image </h2>
      </div>

  );
};

export default OptionItem;