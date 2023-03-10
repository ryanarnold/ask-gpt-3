import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { login } from '../common/auth';
import Button from '../components/button';
import Heading from '../components/heading';
import TextInput from '../components/text-input';

type Props = {};

const LoginPage = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget?.value);
  };

  const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget?.value);
  };

  const handleClickLogin = () => {
    setIsLoading(true);
    login(
      email,
      password,
      () => {
        router.push('/chat');
        setIsLoading(false);
      },
      (error: any) => {
        console.error(error.code);
        setError('Invalid email/password');
      }
    );
  };

  return (
    <>
      <Head>
        <title>Ask GPT-3 - Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-slate-300">
        <div className="grid md:grid-cols-[1fr_2fr_1fr] lg:grid-cols-3">
          <div></div>
          <div>
            <div className="mt-20 rounded-xl bg-white px-16 py-16 drop-shadow-md">
              <Heading text="Login" />
              <div className="mb-3">
                <TextInput placeholder="Email" value={email} changeHandler={handleEmailChange} />
              </div>
              <div>
                <TextInput
                  placeholder="Password"
                  value={password}
                  changeHandler={handlePasswordChange}
                  password={true}
                />
              </div>
              {error ? <p className="text-red-500">{error}</p> : null}
              <div className="mt-5 mb-2">
                <Button clickHandler={handleClickLogin} text="Login" disabled={isLoading} />
              </div>
              <div>
                <Button isLink={true} href="/register" text="Register" />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
