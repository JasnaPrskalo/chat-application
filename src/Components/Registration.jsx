import React, { useState } from 'react';

export default function Registration({ handleRegForm }) {
  const [userName, setUserName] = useState('');

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegForm(userName);
  };

  return (
    <div className='reg-form-container'>
      <form className='reg-input-form' onSubmit={handleSubmit}>
        <label>Registration name: </label>
        <input
          className='reg-input-username'
          type='text'
          placeholder='Enter your name.'
          onChange={handleChange}
        />
        <button className='reg-button' type='submit'>
          Open chat
        </button>
      </form>
    </div>
  );
}

