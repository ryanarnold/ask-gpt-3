import { User } from 'firebase/auth';
import { createContext, SetStateAction, useState } from 'react';

interface context {
  user: User | undefined;
  setUser: Function;
}

const AuthContext = createContext({
  user: undefined,
  setUser: Function,
} as context);

export default AuthContext;
