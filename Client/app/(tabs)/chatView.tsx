import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ChatBody from '../../components/Chat/ChatBody';
import Typebar from '../../components/Chat/Typebar';
import { useRoute } from '@react-navigation/native';
import io from 'socket.io-client';

const chatView = () => {
  const { chat } = useRoute().params;
  const [messages, setMessages] = useState<any>(chat.chat);
  const socket = io('https://evapp-git-reimplementing-eriks-projects-08925273.vercel.app');

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('conversation', chat.chatId);
    });

    socket.on('message', (msg) => {
      //just pass in msg?!
      setMessages((prev) => [
        ...prev,
        { userId: msg.userId, message: { content: msg.message.content, time: msg.message.time } },
      ]);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ChatBody messages={messages} />
      <Typebar chat={chat} />
    </View>
  )
}

export default chatView;