import { app, auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { resolve } from "path";
import { rejects } from "assert";

const googleProvider = new GoogleAuthProvider();

export const createUser = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return console.log(errorCode, errorMessage);
    });
};

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const res = userCredential.user;
      return res;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const res = { errorCode, errorMessage };
      throw res;
    });
};

export const verifyUser = async () => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      return console.log(uid, user);
    } else {
      console.log("No hay usuario");
    }
  });
};

export const signInGoogle = async () => {
  await signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      const response = {
        user,
        token,
      };
      return console.log(response);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
};

export const signInFacebook = async () => {
  await console.log("Sign In  Facebook");
};

export const logOut = async () => {
  await signOut(auth).then(() => {
    console.log("se cerro la sesión");
    verifyUser();
  });
};
