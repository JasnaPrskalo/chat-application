import React, { useState } from 'react';

export default function Input( {onSendMessage} ) {
  const [text, setText] = useState('');

  function onChange(e) {
    setText(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    onSendMessage(text);
    setText('');
  }

  return (
    <div className='chat_input'>
      <form className='msg-form' onSubmit={onSubmit}>
        <input
          className='msg-form_input'
          onChange={onChange}
          value={text}
          type='text'
          placeholder='Enter your message...'
          
        />
        <button className='msg-form_btn'>Send</button>
      </form>
    </div>
  );
}
