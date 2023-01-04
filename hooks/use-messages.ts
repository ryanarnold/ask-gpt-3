import axios from 'axios';
import { User } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import logError from '../common/log-error';
import Message from '../types/message';

export default function useMessages(
  user: User | undefined
): [Message[], () => void, (messageContent: string) => void] {
  const [messages, setMessages] = useState<Array<Message>>([]);

  const fetchMessages = useCallback(() => {
    if (!user) {
      return;
    }

    axios
      .get(`/api/user/${user.uid}/message`)
      .then((response) => {
        if (response.data.length > 0) {
          setMessages(
            response.data.map((msg: any) => {
              return {
                id: msg.id,
                content: msg.content,
                datetime: msg.datetime,
                isGptResponse: msg.is_gpt_response,
              };
            })
          );
        }
      })
      .catch(logError);
  }, [user]);

  const appendMessage = (messageContent: string) => {
    const newMessage: Message = {
      content: messageContent,
      isGptResponse: false,
      datetime: new Date(),
    };

    if (messages && messages?.length > 0) {
      setMessages([...messages, newMessage]);
    } else {
      setMessages([newMessage]);
    }

    axios
      .post(`/api/user/${user?.uid}/message`, {
        content: messageContent,
        isGptResponse: false,
      })
      .then((response) => {
        console.log('message sent');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return [messages, fetchMessages, appendMessage];
}
