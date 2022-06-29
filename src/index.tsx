import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import sass from "sass";

const firebaseConfig = {
  apiKey: "AIzaSyBgH3YmojuveFxvam8M_vgiyhTCsgF1D04",
  authDomain: "prueba-de-uso-73fa1.firebaseapp.com",
  projectId: "prueba-de-uso-73fa1",
  storageBucket: "prueba-de-uso-73fa1.appspot.com",
  messagingSenderId: "1094786358640",
  appId: "1:1094786358640:web:24f2f3457c1d28ae9883b5",
  measurementId: "G-LMJRGXZEPG",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
