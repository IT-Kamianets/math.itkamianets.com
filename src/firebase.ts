import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBbovahWqDRirznwgZvnc303W1YLcl8mc',
  authDomain: 'math-9b005.firebaseapp.com',
  projectId: 'math-9b005',
  storageBucket: 'math-9b005.firebasestorage.app',
  messagingSenderId: '102480342359',
  appId: '1:102480342359:web:0592ee850ca978abf32212',
  measurementId: 'G-0GETVQ3PEF',
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
