import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { login } from '../common/auth';

type Props = {};

const LoginPage = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLoginInfoChange = (event: React.FormEvent<HTMLInputElement>) => {
    const id = event.currentTarget?.id;
    const value = event.currentTarget?.value;

    if (id === 'inputEmail') {
      setEmail(value);
    } else if (id === 'inputPassword') {
      setPassword(value);
    }
  };

  const handleClickLogin = () => {
    login(
      email,
      password,
      () => {
        router.push('/chat');
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
        <title>Ask Tim Ferris - Register</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-5xl">Login</h1>
        <input type="text" placeholder="Email" id="inputEmail" onChange={handleLoginInfoChange} />
        <input
          type="password"
          placeholder="Password"
          id="inputPassword"
          onChange={handleLoginInfoChange}
        />
        <button onClick={handleClickLogin}>Login</button>
        <Link href="/register">
          <button>Register</button>
        </Link>
        {error ? <p>{error}</p> : null}
      </main>
    </>
  );
};

export default LoginPage;