import firebase from "firebase/app";
import "firebase/firestore";


const firebaseConfig = {
  // Your web app's Firebase configuration
  apiKey: "AIzaSyAO9guxHlwMk6llo_hOORSrqlUenDqSGs8",
  authDomain: "legajos-gtz.firebaseapp.com",
  projectId: "legajos-gtz",
  storageBucket: "legajos-gtz.appspot.com",
  messagingSenderId: "459011298371",
  appId: "1:459011298371:web:0dc555e2eae584a3fab0f6"
};

const app = firebase.initializeApp(firebaseConfig);
export function getFirebase() {
  return app;
}

export const db = firebase.firestore();