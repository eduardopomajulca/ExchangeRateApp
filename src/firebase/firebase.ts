import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  authDomain: "exchangeratecs-6eea8.firebaseapp.com",
  projectId: "exchangeratecs-6eea8",
  storageBucket: "exchangeratecs-6eea8.appspot.com",
  messagingSenderId: "1028871012583",
  appId: "1:1028871012583:web:64dd5566da88be0cc16242"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collection = 'rates';
const docId = 'TDmXIypgLKKfNggHHSnw';

export { db, collection, docId };