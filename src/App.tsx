import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { app } from "./index";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { sign } from "crypto";

interface User {
  name: string;
  photo: string;
  email: string;
}
function App() {
  const [user, setUser] = useState<User>({
    name: "",
    photo: "",
    email: "",
  });

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const userResult = result.user;
        console.log(credential, result, user);
        setUser({
          name: userResult.displayName ?? "",
          photo: userResult.photoURL ?? "",
          email: userResult.email ?? "",
        });
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(error);

        // ...
      });
  };

  const verUsuario = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);

        // ...
      } else {
        console.log("No hay usuario");
      }
    });
  };

  const signOutUser = () => {
    signOut(auth)
      .then((user) =>
        setUser({
          name: "",
          photo: "",
          email: "",
        })
      )
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <button onClick={signIn}>Traer info</button>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {user.photo && <img src={user.photo} alt="fotito del tincho " />}{" "}
      <button onClick={verUsuario}>Ver usuario actual</button>
      <button onClick={signOutUser}>LogOut</button>
    </div>
  );
}

export default App;
