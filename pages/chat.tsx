import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import initializeFirebase from '../common/init-firebase';

type Props = {};

const ChatPage = (props: Props) => {
  const [user, setUser] = useState<User>();

  const router = useRouter();

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
  }, []);

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
