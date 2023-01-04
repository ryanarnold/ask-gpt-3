import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createContext, useEffect, useState } from 'react';
import initializeFirebase from '../common/init-firebase';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../common/auth';
import AuthContext from '../contexts/auth-context';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
