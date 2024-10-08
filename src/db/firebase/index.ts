import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// import { firebaseConfigClone } from "../../config/clone-db";
import config from "./../../config";

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId,
};

// const firebaseApp = initializeApp(config.env ? firebaseConfig : firebaseConfigClone);
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firestoreDB = getFirestore(firebaseApp);
