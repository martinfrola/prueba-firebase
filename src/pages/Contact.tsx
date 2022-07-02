import React from "react";
import { useLocation } from "react-router-dom";

export default function Contact() {
  let algo = useLocation();
  console.log("🚀 ~ file: Contact.tsx ~ line 6 ~ Contact ~ algo", algo)

  return <div>Contact</div>;
}
