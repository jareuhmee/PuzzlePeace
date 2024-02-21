import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUktw2Olyx04G0vEZsMwIJpihxCcVzFbg",
  authDomain: "puzzlepeace-a6a79.firebaseapp.com",
  projectId: "puzzlepeace-a6a79",
  storageBucket: "puzzlepeace-a6a79.appspot.com",
  messagingSenderId: "983683787870",
  appId: "1:983683787870:web:0f03528dc1cc36456d18cf",
  measurementId: "G-93G1J16N30"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
