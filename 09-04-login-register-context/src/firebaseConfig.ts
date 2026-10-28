import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4v-ccgZoaLawgqZWxDu9-K3dbyurI7LA",
  authDomain: "dgtdb-706d2.firebaseapp.com",
  projectId: "dgtdb-706d2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
