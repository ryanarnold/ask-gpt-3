import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import initializeFirebase from './init-firebase';
import logError from './log-error';

export function isAuthenticated(yesCallback: Function, noCallback: Function) {
  initializeFirebase();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      noCallback();
    } else {
      yesCallback(user);
    }
  });
}

export function login(
  email: string,
  password: string,
  successCallback: Function,
  failCallback: Function
) {
  initializeFirebase();
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      successCallback();
    })
    .catch((error) => {
      failCallback(error);
    });
}

export function logout(callback: Function) {
  initializeFirebase();
  const auth = getAuth();
  signOut(auth).then(callback()).catch(logError);
}

export function register(
  email: string,
  password: string,
  name: string,
  successCallback: Function,
  failCallback: Function
) {
  initializeFirebase();
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      updateProfile(userCredential.user, {
        displayName: name,
      });

      successCallback();
    })
    .catch((error: any) => {
      failCallback(error);
    });
}

export default {};
