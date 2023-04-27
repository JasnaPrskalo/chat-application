import React, { useState, useEffect } from 'react';
import './App.css';
import Registration from './Components/Registration';
import Messages from './Components/MessageList';
import Input from './Components/InputMessage';
import Header from './Components/Header';

export default function App() {
  const [chat, setChat] = useState({
    member: { username: '' },
    messages: []
  });
  const [drone, setDrone] = useState(null);

  useEffect(() => {
    //nova instanca Scaledorna
    if (chat.member.username !== '') {
      const drone = new window.Scaledrone("AiibcP8gqRi1g2dh", {
        data: chat.member
      });
      setDrone(drone);
    }
  }, [chat.member]);

  useEffect(() => {
    if (chat.messages.length) {
      const scrollElement = document.getElementsByTagName('ul');
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [chat.messages.length]);

  if (drone) {
    drone.on('open', (error) => {
      if (error) {
        return console.error(error);
      }
      chat.member.id = drone.clientId;
      setChat({ ...chat }, chat.member);

      //konekcija sa chat room-om. Obavezan prefix observable.
      const room = drone.subscribe('observable-room');

      //kada se posalje poruka, subscribe-a se na 'data'
      room.on('message', (message) => {
        const { data, member, id } = message;
        chat.messages.push({ member, data, id });
        setChat({ ...chat }, chat.messages);
        console.log(chat); 
      });
    });
  }
  //Prikayuje se poruka svima u chat room-u.
  const onSendMessage = (message) => {
    drone.publish({
      room: 'observable-room',
      message
    });
  };

  //proslijedujem username iz registration forme(text)
  const handleRegForm = (username) => {
    chat.member = {
      username: username
    };
    setChat({ ...chat }, chat.member);
  };

  return chat.member.username === '' ? (
    <div>
    <Header/>
    <Registration handleRegForm={handleRegForm} />
    </div>) : (
    <div className='chat'>
      <Header/>
      <Messages messages={chat.messages} thisMember={chat.member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
}
