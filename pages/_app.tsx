import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { User } from 'firebase/auth';
import AuthContext from '../contexts/auth-context';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
