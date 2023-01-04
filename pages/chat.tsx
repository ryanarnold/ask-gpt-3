import axios, { responseEncoding } from 'axios';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { isAuthenticated, logout } from '../common/auth';
import initializeFirebase from '../common/init-firebase';
import logError from '../common/log-error';
import AuthContext from '../contexts/auth-context';
import useMessages from '../hooks/use-messages';

type Props = {};

const ChatPage = (props: Props) => {
  const [message, setMessage] = useState('');
  const { user, setUser } = useContext(AuthContext);
  const [messages, fetchMessages, appendMessage] = useMessages(user);

  const router = useRouter();

  useEffect(() => {
    isAuthenticated(
      (user: User) => {
        setUser(user);
      },
      () => {
        router.push('/login');
      }
    );
  }, [router]);

  const fetchGptResponse = () => {
    axios
      .post(`/api/user/${user?.uid}/response`, { prompt: message })
      .then(fetchMessages)
      .catch(logError);
  };

  const handleMessageChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget?.value) {
      setMessage(event.currentTarget?.value);
    }
  };

  const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleMessageSend();
    }
  };

  const handleMessageSend = async () => {
    appendMessage(message);
    setMessage('');
    fetchGptResponse();
  };

  const handleLogout = () => {
    logout(() => {
      router.push('/login');
    });
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
              {messages?.map((msg) => (
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
