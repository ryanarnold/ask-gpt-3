import { FirebaseApp, initializeApp } from 'firebase/app';

export default function initializeFirebase(): FirebaseApp {
  const firebaseConfig = {
    apiKey: 'AIzaSyCioguTCIjdQu2ddwP__i8zL5cCPpBHyIM',
    authDomain: 'ask-tim-ferris.firebaseapp.com',
    projectId: 'ask-tim-ferris',
    storageBucket: 'ask-tim-ferris.appspot.com',
    messagingSenderId: '337595385722',
    appId: '1:337595385722:web:b8272f356ebda5ba70f8c3',
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
}
