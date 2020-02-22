import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA1nKXExpvfjOCve0UETO8QLOtyfkWONS8",
  authDomain: "reactkurs-8f724.firebaseapp.com",
  databaseURL: "https://reactkurs-8f724.firebaseio.com",
  projectId: "reactkurs-8f724",
  storageBucket: "reactkurs-8f724.appspot.com",
  messagingSenderId: "270877989929",
  appId: "1:270877989929:web:146f3013ef4262ea131038",
  measurementId: "G-JPS1E9VMC2"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShop = await userRef.get();

  if (!snapShop.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
        await userRef.set({
            displayName, 
            email,
            createdAt,
            ...additionalData
        })
    } catch(error) {
        console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
