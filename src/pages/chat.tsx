import axios from 'axios';
import { User } from 'firebase/auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { isAuthenticated, logout } from '../common/auth';
import logError from '../common/log-error';
import Button from '../components/button';
import ChatBubble from '../components/chat-bubble';
import Heading from '../components/heading';
import TextInput from '../components/text-input';
import AuthContext from '../contexts/auth-context';
import useMessages from '../hooks/use-messages';

type Props = {};

const ChatPage = (props: Props) => {
  const [message, setMessage] = useState('');
  const { user, setUser } = useContext(AuthContext);
  const [messages, fetchMessages, appendMessage] = useMessages(user);

  const router = useRouter();

  const chatLog = useRef<HTMLDivElement>(null);

  // Check if user is authenticated, if not, redirect to /login
  useEffect(() => {
    isAuthenticated(
      (user: User) => {
        setUser(user);
      },
      () => {
        router.push('/login');
      }
    );
  }, [router, setUser]);

  // Generate a ChatGPT response after every message from the user
  const fetchGptResponse = () => {
    axios
      .post(`/api/user/${user?.uid}/response`, { prompt: message })
      .then(fetchMessages)
      .catch(logError);
  };

  const handleMessageChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget?.value);
  };

  const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleMessageSend();
    }
  };

  const handleMessageSend = async () => {
    scrollChatLog();
    appendMessage(message);
    setMessage('');
    fetchGptResponse();
  };

  const handleLogout = () => {
    logout(() => {
      router.push('/login');
    });
  };

  const scrollChatLog = () => {
    if (chatLog.current) {
      const scroll = chatLog.current?.scrollHeight - chatLog.current?.clientHeight;
      chatLog.current?.scrollTo(0, scroll);
    }
  };

  useEffect(() => {
    scrollChatLog();
  }, [chatLog.current]);

  if (user) {
    return (
      <>
        <Head>
          <title>Ask Tim Ferris - Chat</title>
          <meta name="description" content="Ask Tim Ferris - Chat Page" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="h-screen ">
          <div
            className="fixed top-10 grid h-[92%] w-full grid-cols-3 overflow-y-scroll"
            ref={chatLog}
          >
            <div></div>
            <div className="h-full ">
              <div>
                <div className="grid grid-cols-[3fr_1fr]">
                  <div>
                    <h1 className="text-3xl font-bold">Hi {user.displayName}, chat with GPT-3</h1>
                  </div>
                  <div>
                    <button
                      className="text-md w-full rounded-lg bg-slate-100 p-3"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <div></div>
              </div>

              <div className="mt-3 h-full ">
                {messages.length > 0 ? (
                  messages?.map((msg) => (
                    <ChatBubble key={msg.id} text={msg.content} isGpt={msg.isGptResponse} />
                  ))
                ) : (
                  <div className="m-auto flex h-full">
                    <p className="m-auto text-lg text-slate-300">Chat with GPT-3!</p>
                  </div>
                )}
              </div>
            </div>
            <div></div>
          </div>
          <div className="fixed bottom-0 mb-5 w-screen bg-white">
            <div className="grid grid-cols-3">
              <div></div>
              <div className="mt-5 grid grid-cols-[5fr_1fr] gap-3">
                <div>
                  <TextInput
                    placeholder="Type a message..."
                    value={message}
                    changeHandler={handleMessageChange}
                    sendHandler={handlePressEnter}
                  />
                </div>
                <div>
                  <Button clickHandler={handleMessageSend} text="Send" />
                </div>
              </div>
            </div>
            <div></div>
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
