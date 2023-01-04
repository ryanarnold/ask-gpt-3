import axios, { responseEncoding } from 'axios';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import initializeFirebase from '../common/init-firebase';
import logError from '../common/log-error';

type Props = {};

interface Message {
  id?: number;
  content: string;
  datetime: Date;
  isGptResponse: boolean;
}

const ChatPage = (props: Props) => {
  const [user, setUser] = useState<User>();
  const [message, setMessage] = useState('');
  const [messageLog, setMessageLog] = useState<Array<Message>>();
  const [gptTyping, setGptTyping] = useState(false);

  const router = useRouter();

  const fetchMessages = useCallback(() => {
    axios
      .get(`/api/user/${user?.uid}/message`)
      .then((response) => {
        if (response.data.length > 0) {
          setMessageLog(
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
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  const fetchGptResponse = () => {
    setGptTyping(true);

    axios
      .post(`/api/user/${user?.uid}/response`, { prompt: message })
      .then(fetchMessages)
      .catch(logError);
    setGptTyping(false);
  };

  useEffect(() => {
    initializeFirebase();

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
    });
  }, [router]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleLogout = () => {
    initializeFirebase();
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        router.push('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMessageChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget?.value) {
      setMessage(event.currentTarget?.value);
    }
  };

  const handleMessageSend = async () => {
    setMessage('');

    const newMessage: Message = {
      content: message,
      isGptResponse: false,
      datetime: new Date(),
    };

    if (messageLog && messageLog?.length > 0) {
      setMessageLog([...messageLog, newMessage]);
    } else {
      setMessageLog([newMessage]);
    }

    axios
      .post(`/api/user/${user?.uid}/message`, {
        content: message,
        isGptResponse: false,
      })
      .then((response) => {
        console.log('message sent');
        //fetchMessages();
        fetchGptResponse();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleMessageSend();
    }
  };

  if (user) {
    return (
      <>
        <Head>
          <title>Ask Tim Ferris - Chat</title>
          <meta name="description" content="Ask Tim Ferris - Chat Page" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1 className="text-5xl">Chat Page</h1>
          <button onClick={handleLogout}>Logout</button>
          <div>
            <div>
              <input
                type="text"
                className="border"
                onChange={handleMessageChange}
                onKeyUp={handlePressEnter}
                value={message}
                autoFocus
              />

              <button onClick={handleMessageSend}>Send</button>
            </div>
            <div>
              {messageLog?.map((msg) => (
                <div key={msg.id}>
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </>
    );
  } else {
    <>
      <Head>
        <title>Loading...</title>
        <meta name="description" content="Ask Tim Ferris - Chat Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>Loading</p>
      </main>
    </>;
  }
};

export default ChatPage;
