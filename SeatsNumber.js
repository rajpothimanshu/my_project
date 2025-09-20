import React from 'react';
import '../Css/SeatsNumber.css';

const SeatsNumber = ({ text, data, changeSelect }) => {
  const handleChange = (e) => {
    const value = Number(e.target.value);
    changeSelect({ ...data, [text]: value });  
    window.localStorage.setItem(
      "seats",
      JSON.stringify({ ...data, [text]: value })
    );
  };

  return (
    <div className='form_check_label'>
      <span className='text'>{text}</span>
      <input
        type='number'
        className='seats-input'
        placeholder='0'
        max='30'
        min='0'
        name={text}
        onChange={handleChange}
      />
    </div>
  );
};

export default SeatsNumber;
