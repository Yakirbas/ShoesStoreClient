
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY ,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket:import.meta.env.VITE_STORGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_messaging_Sender_Id,
  appId: import.meta.env.VITE_APP_ID
};

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
