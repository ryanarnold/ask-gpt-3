import axios, { responseEncoding } from 'axios';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import initializeFirebase from '../common/init-firebase';

type Props = {};

interface Message {
  id: number;
  content: string;
  datetime: Date;
  isGptResponse: boolean;
}

const ChatPage = (props: Props) => {
  const [user, setUser] = useState<User>();
  const [message, setMessage] = useState('');
  const [messageLog, setMessageLog] = useState<Array<Message>>();

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

    axios
      .post(`/api/user/${user?.uid}/message`, {
        content: message,
        isGptResponse: false,
      })
      .then((response) => {
        console.log('message sent');
        fetchMessages();
      })
      .catch((error) => {
        console.log(error);
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
                value={message}
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
