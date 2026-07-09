import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCSleyKLOGuVTO8mkLFcE5PI5ydqARdKD0",
  authDomain: "sahil-it-academy-online.firebaseapp.com",
  projectId: "sahil-it-academy-online",
  storageBucket: "sahil-it-academy-online.firebasestorage.app",
  messagingSenderId: "307253491797",
  appId: "1:307253491797:web:94e0affc833e3dcb48bcdc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);